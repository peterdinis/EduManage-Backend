import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EnrollmentResolver } from './enrollment.resolver';
import { EnrollmentService } from './enrollement.service';

@Module({
  imports: [PrismaModule],
  providers: [EnrollmentResolver, EnrollmentService],
})

export class EnrollmentModule {}
