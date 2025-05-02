import { InputType, Field, PartialType } from '@nestjs/graphql';
import { RegisterStudentInput } from './register-student-input';

@InputType()
export class UpdateStudentInput extends PartialType(RegisterStudentInput) {
  @Field()
  id: number;
}