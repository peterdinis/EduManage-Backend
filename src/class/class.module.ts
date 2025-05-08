import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClassResolver } from './class.resolver';
import { ClassService } from './class.service';

@Module({
  imports: [PrismaModule],
  providers: [ClassResolver, ClassService],
})
export class ClassModule {}
