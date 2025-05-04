import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TeacherResolver } from './teacher.resolver';
import { TeacherService } from './teacher.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule.register({
    secret: process.env.JWT_SECRET || 'supersecret',
    signOptions: { expiresIn: '1d' },
  }),],
  providers: [TeacherResolver, TeacherService],
})
export class TeacherModule {}
