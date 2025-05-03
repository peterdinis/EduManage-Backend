import { InputType, Field } from '@nestjs/graphql';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js'; 
@InputType()
export class CreateUploadInput {
  @Field(() => GraphQLUpload)
  file: Promise<FileUpload>;
}