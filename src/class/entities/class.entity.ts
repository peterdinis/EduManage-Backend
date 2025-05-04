import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ClassEntity {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Int)
  subjectId: number;

  @Field(() => Date)
  createdAt?: Date;
}
