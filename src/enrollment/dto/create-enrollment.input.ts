import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateEnrollmentInput {
  @Field(() => Int)
  studentId: number;

  @Field(() => Int)
  classId: number;
}