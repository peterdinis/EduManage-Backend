import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateSubjectInput } from './create-subject-dto';

@InputType()
export class UpdateSubjectInput extends PartialType(CreateSubjectInput) {
  @Field(() => Int)
  id: number;
}
