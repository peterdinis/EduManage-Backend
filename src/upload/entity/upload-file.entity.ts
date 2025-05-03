import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UploadFile {
  @Field(() => Int)
  id: number;

  @Field()
  filename: string;

  @Field()
  mimetype: string;

  @Field()
  path: string;

  @Field()
  createdAt: Date;
}
