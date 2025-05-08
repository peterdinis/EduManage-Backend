import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateAssigmentInput } from './create-assigment.dto';

@InputType()
export class UpdateAssigmentInput extends PartialType(CreateAssigmentInput) {
  @Field(() => Int)
  id: number;
}