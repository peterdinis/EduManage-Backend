import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateSubjectInput {
  @Field()
  name: string;

  @Field(() => Int)
  teacherId: number;
}
