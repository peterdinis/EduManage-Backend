import { InputType, Field } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload/index';

@InputType()
export class CreateUploadInput {
  @Field(() => GraphQLUpload)
  file: Promise<FileUpload>;
}