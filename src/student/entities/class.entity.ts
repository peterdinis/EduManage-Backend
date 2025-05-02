import { Field, Int } from '@nestjs/graphql';
import { Subject } from './subject.entity';

export class Class {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Subject)
  subject: Subject;
}
