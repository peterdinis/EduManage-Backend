import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UploadService } from './upload.service';
import { UploadResolver } from './upload.resolver';

@Module({
  imports: [PrismaModule],
  providers: [UploadService, UploadResolver],
  exports: [UploadService, UploadResolver],
})
export class UploadModule {}
