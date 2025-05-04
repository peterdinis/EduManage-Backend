import { Injectable} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubjectInput } from './dto/create-subject-dto';
import { UpdateSubjectInput } from './dto/update-subject.dto';

@Injectable()
export class SubjectService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateSubjectInput) {
    return this.prisma.subject.create({ data });
  }

  findAll() {
    return this.prisma.subject.findMany({
      include: { teacher: true },
    });
  }

  findOne(id: number) {
    return this.prisma.subject.findUnique({
      where: { id },
      include: { teacher: true },
    });
  }

  update(id: number, data: UpdateSubjectInput) {
    return this.prisma.subject.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.subject.delete({ where: { id } });
  }
}
