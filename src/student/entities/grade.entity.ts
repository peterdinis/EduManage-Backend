import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Class } from "./class.entity";

@ObjectType()
export class Grade {
  @Field(() => Int)
  id: number;

  @Field()
  value: number;

  @Field()
  gradedAt: Date;

  @Field(() => Class)
  class: Class;
}