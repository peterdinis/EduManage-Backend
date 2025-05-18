import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceInput } from './dto/create-attendance.input';
import { UpdateAttendanceInput } from './dto/update-attendance.input';
import { AttendanceApp } from './entity/attendance.model';
import { PaginatedAttendance } from './dto/pagination-attendance.input';

@Resolver(() => AttendanceApp)
export class AttendanceResolver {
  constructor(private readonly service: AttendanceService) {}

  @Mutation(() => AttendanceApp)
  createAttendance(@Args('input') input: CreateAttendanceInput) {
    return this.service.create(input);
  }

  @Query(() => [AttendanceApp])
  attendances() {
    return this.service.findAll();
  }

  @Query(() => AttendanceApp)
  attendance(@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => AttendanceApp)
  updateAttendance(@Args('input') input: UpdateAttendanceInput) {
    return this.service.update(input.id, input);
  }

  @Mutation(() => AttendanceApp)
  removeAttendance(@Args('id', { type: () => Int }) id: number) {
    return this.service.remove(id);
  }

  @Query(() => PaginatedAttendance)
  paginationAttendance(
    @Args('page', { type: () => Int, nullable: true }) page?: number,
    @Args('limit', { type: () => Int, nullable: true }) limit?: number,
    @Args('search', { type: () => String, nullable: true }) search?: string,
  ) {
    return this.service.pagination({ page, limit, search });
  }
}
