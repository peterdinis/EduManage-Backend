import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '../../generated/prisma';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TeacherService {
  constructor(private readonly prisma: PrismaService,  private readonly jwtService: JwtService) {}

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

  private generateToken(student: { id: number; email: string }) {
      return this.jwtService.sign({ sub: student.id, email: student.email });
    }
  
    async register(data: RegisterStudentInput) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
  
      const parsedDateOfBirth =
        typeof data.dateOfBirth === 'string'
          ? parseISO(data.dateOfBirth)
          : data.dateOfBirth;
  
      const student = await this.prisma.student.create({
        data: {
          email: data.email,
          password: hashedPassword,
          firstName: data.firstName,
          lastName: data.lastName,
          dateOfBirth: parsedDateOfBirth,
        },
      });
  
      return {
        accessToken: this.generateToken(student),
      };
    }
  
    async login(data: LoginInput) {
      const student = await this.prisma.student.findUnique({
        where: { email: data.email },
      });
  
      if (!student || !(await bcrypt.compare(data.password, student.password))) {
        throw new UnauthorizedException('Invalid credentials');
      }
  
      return {
        accessToken: this.generateToken(student),
      };
    }
  
    async profile(studentId: number) {
      return this.prisma.student.findUnique({ where: { id: studentId } });
    }
}
