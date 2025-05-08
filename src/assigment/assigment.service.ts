import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAssigmentInput } from './dto/create-assigment.dto';
import { UpdateAssigmentInput } from './dto/update-assigment.dto';

@Injectable()
export class AssigmentService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateAssigmentInput) {
    return this.prisma.assigment.create({ data });
  }

  findAll() {
    return this.prisma.assigment.findMany({ include: { subject: true } });
  }

  findOne(id: number) {
    return this.prisma.assigment.findUnique({ where: { id }, include: { subject: true } });
  }

  async update(id: number, data: UpdateAssigmentInput) {
    const existing = await this.prisma.assigment.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Assigment not found');

    return this.prisma.assigment.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    const existing = await this.prisma.assigment.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Assigment not found');

    return this.prisma.assigment.delete({ where: { id } });
  }
}
