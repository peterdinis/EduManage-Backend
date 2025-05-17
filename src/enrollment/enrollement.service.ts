import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEnrollmentInput } from './dto/create-enrollment.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EnrollmentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateEnrollmentInput) {
    return this.prisma.enrollment.create({
      data: {
        studentId: input.studentId,
        classId: input.classId,
      },
    });
  }

  async findAll() {
    return this.prisma.enrollment.findMany({
      include: {
        student: true,
        class: true,
      },
    });
  }

  async findOne(id: number) {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { id },
      include: {
        student: true,
        class: true,
      },
    });
    if (!enrollment) {
      throw new NotFoundException(`Enrollment with ID ${id} not found`);
    }
    return enrollment;
  }

  async remove(id: number) {
    await this.findOne(id); // ensure exists
    return this.prisma.enrollment.delete({
      where: { id },
    });
  }
}