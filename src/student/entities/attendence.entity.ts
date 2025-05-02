import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Class } from './class.entity';

@ObjectType()
export class Attendance {
  @Field(() => Int)
  id: number;

  @Field()
  date: Date;

  @Field()
  status: string;

  @Field(() => Class)
  class: Class;
}
