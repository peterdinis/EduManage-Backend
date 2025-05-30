import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength, IsDateString } from 'class-validator';

@InputType()
export class RegisterStudentInput {
  @Field()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsNotEmpty()
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(6)
  password: string;

  @Field()
  @IsDateString()
  dateOfBirth: string; // or Date if you prefer converting elsewhere
}
