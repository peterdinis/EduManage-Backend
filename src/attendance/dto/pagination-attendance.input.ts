import { ObjectType, Field, Int } from '@nestjs/graphql';
import { AttendanceApp } from '../entity/attendance.model';

@ObjectType()
export class PaginatedAttendance {
  @Field(() => [AttendanceApp])
  data: AttendanceApp[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  totalPages: number;
}
