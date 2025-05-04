import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Teacher } from 'src/teacher/entities/teacher.model';

@ObjectType()
export class Subject {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Int)
  teacherId: number;

  @Field(() => Teacher)
  teacher: Teacher;
}