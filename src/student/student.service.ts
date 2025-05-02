import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterStudentInput } from './dto/register-student-input';
import { LoginInput } from './dto/login-student-input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  async register(data: RegisterStudentInput) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.student.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  async login(data: LoginInput) {
    const student = await this.prisma.student.findUnique({
      where: { email: data.email },
    });

    if (!student || !(await bcrypt.compare(data.password, student.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return student;
  }

  async profile(studentId: string) {
    return this.prisma.student.findUnique({ where: { id: studentId } });
  }

  async getStudentClasses(studentId: number) {
    return this.prisma.class.findMany({
      where: {
        enrollments: {
          some: {
            studentId,
          },
        },
      },
      include: {
        subject: true,
        teacher: true,
      },
    });
  }

  // Get all attendance records for the student
  async getStudentAttendance(studentId: number) {
    return this.prisma.attendance.findMany({
      where: { studentId },
      include: {
        class: true,
      },
    });
  }

  // Get all grades for the student
  async getStudentGrades(studentId: number) {
    return this.prisma.grade.findMany({
      where: { studentId },
      include: {
        class: true,
      },
    });
  }
}
