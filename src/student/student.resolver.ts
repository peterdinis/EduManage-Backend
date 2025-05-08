import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { StudentService } from './student.service';
import {
  LoginStudentInput,
  LoginStudentResponse,
} from './dto/login-student-input';
import { RegisterStudentInput } from './dto/register-student-input';
import { Student } from './entities/student.entity';
import { Attendance } from './entities/attendence.entity';
import { Class } from './entities/class.entity';
import { Grade } from './entities/grade.entity';
import { UpdateStudentInput } from './dto/update-student-profile.dto';
import { UseGuards } from '@nestjs/common';
import { CurrentStudent } from './decorators/current-user.decorator';
import { GqlAuthGuard } from './guards/qql-auth.guard';
import { PaginationSearchInput } from './dto/pagination-search-input';

@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Mutation(() => LoginStudentResponse)
  async registerStudent(@Args('data') data: RegisterStudentInput) {
    return this.studentService.register(data);
  }

  @Mutation(() => LoginStudentResponse)
  async loginStudent(@Args('data') data: LoginStudentInput) {
    return this.studentService.login(data);
  }

  @Query(() => Student)
  @UseGuards(GqlAuthGuard)
  async studentProfile(@CurrentStudent('sub') id: number) {
    return this.studentService.profile(id);
  }

  @Query(() => [Class])
  @UseGuards(GqlAuthGuard)
  async studentClasses(
    @CurrentStudent('sub') studentId: number,
    @Args('input', { nullable: true }) input?: PaginationSearchInput,
  ) {
    return this.studentService.getStudentClasses(studentId, input);
  }

  @Query(() => [Attendance])
  @UseGuards(GqlAuthGuard)
  async studentAttendance(
    @CurrentStudent('sub') studentId: number,
    @Args('input', { nullable: true }) input?: PaginationSearchInput,
  ) {
    return this.studentService.getStudentAttendance(studentId, input);
  }

  @Query(() => [Grade])
  @UseGuards(GqlAuthGuard)
  async studentGrades(
    @CurrentStudent('sub') studentId: number,
    @Args('input', { nullable: true }) input?: PaginationSearchInput,
  ) {
    return this.studentService.getStudentGrades(studentId, input);
  }

  @Mutation(() => Student)
  @UseGuards(GqlAuthGuard)
  async updateStudentProfile(@Args('data') data: UpdateStudentInput) {
    return this.studentService.updateProfile(data);
  }
}
