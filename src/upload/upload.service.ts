import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUploadInput } from './dto/create-upload.input';
import { join } from 'path';
import { createWriteStream, existsSync, mkdirSync } from 'fs';

@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) {}

  async uploadFile(createUploadInput: CreateUploadInput) {
    const { file } = createUploadInput;
    const { createReadStream, filename, mimetype } = await file;

    const uploadsDir = join(__dirname, '../../uploads');
    if (!existsSync(uploadsDir)) {
      mkdirSync(uploadsDir);
    }

    const filePath = join(uploadsDir, filename);

    return new Promise(async (resolve, reject) => {
      createReadStream()
        .pipe(createWriteStream(filePath))
        .on('finish', async () => {
          const saved = await this.prisma.uploadFile.create({
            data: {
              filename,
              mimetype,
              path: `/uploads/${filename}`,
            },
          });
          resolve(saved);
        })
        .on('error', reject);
    });
  }

  findAll() {
    return this.prisma.uploadFile.findMany();
  }
}
