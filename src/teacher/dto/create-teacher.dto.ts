import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTeacherInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  password?: string;
}