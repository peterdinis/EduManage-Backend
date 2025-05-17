import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAttendanceInput } from './dto/create-attendance.input';
import { UpdateAttendanceInput } from './dto/update-attendance.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AttendanceService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateAttendanceInput) {
    return this.prisma.attendance.create({ data });
  }

  findAll() {
    return this.prisma.attendance.findMany({
      include: { student: true, class: true },
    });
  }

  findOne(id: number) {
    return this.prisma.attendance.findUnique({
      where: { id },
      include: { student: true, class: true },
    });
  }

  async update(id: number, data: UpdateAttendanceInput) {
    const exists = await this.prisma.attendance.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Attendance not found');

    return this.prisma.attendance.update({ where: { id }, data });
  }

  async remove(id: number) {
    const exists = await this.prisma.attendance.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Attendance not found');

    return this.prisma.attendance.delete({ where: { id } });
  }

  async pagination({
    page = 1,
    limit = 10,
    search = '',
  }: {
    page?: number;
    limit?: number;
    search?: string;
  }) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.attendance.findMany({
        skip,
        take: limit,
        where: {
          OR: [
            { status: { contains: search } },
            {
              student: {
                firstName: { contains: search },
              },
            },
            {
              class: {
                name: { contains: search },
              },
            },
          ],
        },
        include: {
          student: true,
          class: true,
        },
      }),
      this.prisma.attendance.count({
        where: {
          OR: [
            { status: { contains: search } },
            {
              student: {
                firstName: { contains: search },
              },
            },
            {
              class: {
                name: { contains: search },
              },
            },
          ],
        },
      }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
