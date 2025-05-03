import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Subject } from './subject.entity';

@ObjectType()
export class Class {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Subject)
  subject: Subject;
}
