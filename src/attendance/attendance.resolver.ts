import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceInput } from './dto/create-attendance.input';
import { UpdateAttendanceInput } from './dto/update-attendance.input';
import { Attendance } from './entity/attendance.model';
import { PaginatedAttendance } from './dto/pagination-attendance.input';

@Resolver(() => Attendance)
export class AttendanceResolver {
    constructor(private readonly service: AttendanceService) { }

    @Mutation(() => Attendance)
    createAttendance(@Args('input') input: CreateAttendanceInput) {
        return this.service.create(input);
    }

    @Query(() => [Attendance])
    attendances() {
        return this.service.findAll();
    }

    @Query(() => Attendance)
    attendance(@Args('id', { type: () => Int }) id: number) {
        return this.service.findOne(id);
    }

    @Mutation(() => Attendance)
    updateAttendance(@Args('input') input: UpdateAttendanceInput) {
        return this.service.update(input.id, input);
    }

    @Mutation(() => Attendance)
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