import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
export class Student {
  @Field(() => ID) id: string;
  @Field() name: string;
  @Field() email: string;
  @Field() createdAt: Date;
}