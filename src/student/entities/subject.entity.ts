import { Field, Int } from "@nestjs/graphql";

export class Subject {
    @Field(() => Int)
    id: number;
  
    @Field()
    name: string;
  }