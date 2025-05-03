import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '../../generated/prisma';

@Injectable()
export class TeacherService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.teacher.findMany({
      include: { subjects: true },
    });
  }

  async findOne(id: number) {
    const teacher = await this.prisma.teacher.findUnique({
      where: { id },
      include: { subjects: true },
    });
    if (!teacher)
      throw new NotFoundException(`Teacher with ID ${id} not found.`);
    return teacher;
  }

  async create(data: Prisma.TeacherCreateInput) {
    return this.prisma.teacher.create({ data });
  }

  async update(id: number, data: Prisma.TeacherUpdateInput) {
    return this.prisma.teacher.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.teacher.delete({ where: { id } });
  }
}
