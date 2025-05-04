import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateClassInput } from './dto/update-class-input.dto';
import { CreateClassInput } from './dto/create-class-input.dto';

@Injectable()
export class ClassService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.class.findMany({
      include: { subject: true, enrollments: true, grades: true, attendances: true },
    });
  }

  async findOne(id: number) {
    const classEntity = await this.prisma.class.findUnique({
      where: { id },
      include: { subject: true, enrollments: true, grades: true, attendances: true },
    });
    if (!classEntity) throw new NotFoundException(`Class ${id} not found`);
    return classEntity;
  }

  async create(data: CreateClassInput) {
    return this.prisma.class.create({ data });
  }

  async update(id: number, data: UpdateClassInput) {
    return this.prisma.class.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.class.delete({ where: { id } });
  }
}
