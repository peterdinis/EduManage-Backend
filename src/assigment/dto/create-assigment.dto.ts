import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateAssigmentInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  dueDate: Date;

  @Field(() => Int)
  subjectId: number;
}