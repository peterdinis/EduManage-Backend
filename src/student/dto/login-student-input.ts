import { ObjectType, Field, InputType } from '@nestjs/graphql';

@ObjectType()
export class LoginStudentResponse {
  @Field()
  accessToken: string;
}

@InputType()
export class LoginStudentInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
