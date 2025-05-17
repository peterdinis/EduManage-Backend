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
}