import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CreateUploadInput } from './dto/create-upload.input';
import { UploadFile } from './entity/upload-file.entity';
import { UploadService } from './upload.service';

@Resolver(() => UploadFile)
export class UploadResolver {
  constructor(private readonly uploadFileService: UploadService) {}

  @Mutation(() => UploadFile)
  async uploadFile(@Args('input') input: CreateUploadInput) {
    return this.uploadFileService.uploadFile(input);
  }

  @Query(() => [UploadFile])
  async allUploadedFiles() {
    return this.uploadFileService.findAll();
  }
}
