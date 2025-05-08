import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ClassSearchInput {
  @Field({ nullable: true })
  query?: string;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => Int, { nullable: true })
  take?: number;
}
