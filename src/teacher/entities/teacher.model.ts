import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Subject } from 'src/student/entities/subject.entity';

@ObjectType()
export class Teacher {
  @Field(() => Int)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field(() => [Subject], { nullable: true })
  subjects?: Subject[];
}
