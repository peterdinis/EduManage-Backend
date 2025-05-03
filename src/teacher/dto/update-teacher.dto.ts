import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateTeacherInput {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;
}
