import { InputType, Field } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from '../scalars/upload-scalars';

@InputType()
export class CreateUploadInput {
  @Field(() => GraphQLUpload)
  file: Promise<FileUpload>;
}
