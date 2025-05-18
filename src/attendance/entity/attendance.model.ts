import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Class } from 'src/student/entities/class.entity';
import { Student } from 'src/student/entities/student.entity';

@ObjectType()
export class AttendanceApp {
  @Field(() => Int)
  id: number;

  @Field()
  date: Date;

  @Field()
  status: string;

  @Field(() => Int)
  studentId: number;

  @Field(() => Int)
  classId: number;

  @Field(() => Student, { nullable: true })
  student?: Student;

  @Field(() => Class, { nullable: true })
  class?: Class;
}
