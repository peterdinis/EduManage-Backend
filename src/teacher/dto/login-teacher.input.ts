import { ObjectType, Field, InputType } from '@nestjs/graphql';

@ObjectType()
export class LoginTeacherResponse {
  @Field()
  accessToken: string;
}

@InputType()
export class LoginTeacherInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
