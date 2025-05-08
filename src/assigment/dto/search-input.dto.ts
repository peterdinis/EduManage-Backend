import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class AssigmentSearchInput {
  @Field(() => String, { nullable: true })
  query?: string;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => Int, { nullable: true })
  take?: number;
}