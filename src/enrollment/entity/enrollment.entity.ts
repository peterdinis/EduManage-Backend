import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';
import { Class } from 'src/student/entities/class.entity';
import { Student } from 'src/student/entities/student.entity';


@ObjectType()
export class Enrollment {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  studentId: number;

  @Field(() => Int)
  classId: number;

  @Field(() => GraphQLISODateTime)
  enrolledAt: Date;

  @Field(() => Student)
  student: Student;

  @Field(() => Class)
  class: Class;
}