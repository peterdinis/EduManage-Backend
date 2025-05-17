import { Test, TestingModule } from '@nestjs/testing';
import { UploadFile } from 'generated/prisma';
import { UploadResolver } from '../upload.resolver';
import { UploadService } from '../upload.service';
import { CreateUploadInput } from '../dto/create-upload.input';
import { FileUpload } from '../scalars/upload-scalars';

describe('UploadResolver', () => {
  let resolver: UploadResolver;
  let service: UploadService;

  const mockUploadFile: UploadFile = {
    id: 1,
    filename: 'example.pdf',
    mimetype: 'application/pdf',
    path: '/uploads/example.pdf',
    createdAt: new Date(),
  };

  const mockUploadService = {
    uploadFile: jest.fn().mockResolvedValue(mockUploadFile),
    findAll: jest.fn().mockResolvedValue([mockUploadFile]),
    deleteFile: jest.fn().mockResolvedValue({ message: 'File deleted successfully' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UploadResolver,
        {
          provide: UploadService,
          useValue: mockUploadService,
        },
      ],
    }).compile();

    resolver = module.get<UploadResolver>(UploadResolver);
    service = module.get<UploadService>(UploadService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('uploadFile', () => {
    it('should call uploadFile and return uploaded file', async () => {
      const file: FileUpload = {
        filename: 'example.pdf',
        mimetype: 'application/pdf',
        encoding: '7bit',
        createReadStream: jest.fn(), // Mock stream
      };

      const input: CreateUploadInput = {
        file: Promise.resolve(file),
      };

      const result = await resolver.uploadFile(input);
      expect(service.uploadFile).toHaveBeenCalledWith(input);
      expect(result).toEqual(mockUploadFile);
    });
  });

  describe('allUploadedFiles', () => {
    it('should return all uploaded files', async () => {
      const result = await resolver.allUploadedFiles();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockUploadFile]);
    });
  });

  describe('deleteFile', () => {
    it('should delete a file and return message', async () => {
      const fileId = 1;
      const result = await resolver.deleteFile(fileId);
      expect(service.deleteFile).toHaveBeenCalledWith(fileId);
      expect(result).toBe('File deleted successfully');
    });
  });
});
