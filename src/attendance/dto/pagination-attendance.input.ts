import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Attendance } from '../entity/attendance.model';

@ObjectType()
export class PaginatedAttendance {
  @Field(() => [Attendance])
  data: Attendance[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  totalPages: number;
}
