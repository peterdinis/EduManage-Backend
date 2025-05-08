import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateClassInput {
  @Field()
  name: string;

  @Field(() => Int)
  subjectId: number;
}
