import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class SendEmailInput {
  @Field()
  @IsEmail()
  to: string;

  @Field()
  @IsNotEmpty()
  subject: string;

  @Field()
  @MinLength(5)
  message: string;
}
