import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '../../generated/prisma';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateTeacherInput } from './dto/create-teacher.dto';
import { LoginInput } from './dto/login-teacher.input';

@Injectable()
export class TeacherService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

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

  private generateTokenForTeacher(teacher: { id: number; email: string }) {
    return this.jwtService.sign({ sub: teacher.id, email: teacher.email });
  }

  async register(data: CreateTeacherInput) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const teacher = await this.prisma.teacher.create({
      data: {
        email: data.email,
        password: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
      },
    });

    return {
      accessToken: this.generateTokenForTeacher(teacher),
    };
  }

  async login(data: LoginInput) {
    const teacher = await this.prisma.teacher.findUnique({
      where: { email: data.email },
    });

    if (!teacher || !(await bcrypt.compare(data.password, teacher.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      accessToken: this.generateTokenForTeacher(teacher),
    };
  }

  async profile(teacherId: number) {
    return this.prisma.teacher.findUnique({ where: { id: teacherId } });
  }
}
