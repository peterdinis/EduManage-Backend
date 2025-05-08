import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class PaginationSearchInput {
  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field({ nullable: true })
  query?: string;
}
