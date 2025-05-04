import { InputType, PartialType } from '@nestjs/graphql';
import { CreateClassInput } from './create-class-input.dto';

@InputType()
export class UpdateClassInput extends PartialType(CreateClassInput) {}
