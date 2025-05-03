import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUploadInput } from './dto/create-upload.input';
import { join } from 'path';
import { createWriteStream, existsSync, mkdirSync, unlinkSync } from 'fs';

@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) { }

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

  async findAll() {
    const files = await this.prisma.uploadFile.findMany();

    if (!files) throw new NotFoundException("No files was uplodaed");

    return files;

  }

  async findOneFile(fileId: number) {
    const file = await this.prisma.uploadFile.findFirst({
      where: {
        id: fileId
      }
    });

    if (!file) throw new NotFoundException("File does not exists");

    return file
  }

  async deleteFile(fileId: number) {
    const file = await this.prisma.uploadFile.findUnique({
      where: { id: fileId },
    });
  
    if (!file) {
      throw new NotFoundException('File not found');
    }
  
    const filePath = join(__dirname, '../../', file.path);
    if (existsSync(filePath)) {
      unlinkSync(filePath);
    }
  
    await this.prisma.uploadFile.delete({
      where: { id: fileId },
    });
  
    return { message: 'File deleted successfully', fileId };
  }
}
