import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { LoginInput, LoginResponse } from './dto/login-student-input';
import { RegisterStudentInput } from './dto/register-student-input';
import { Student } from './entities/student.entity';
import { Attendance } from './entities/attendence.entity';
import { Class } from './entities/class.entity';
import { Grade } from './entities/grade.entity';
import { UpdateStudentInput } from './dto/update-student-profile.dto';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from './decorators/current-user.decorator';
import { GqlAuthGuard } from './guards/qql-auth.guard';

@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Mutation(() => LoginResponse)
  async registerStudent(@Args('data') data: RegisterStudentInput) {
    return this.studentService.register(data);
  }

  @Mutation(() => LoginInput)
  async loginStudent(@Args('data') data: LoginInput) {
    return this.studentService.login(data);
  }

  @Query(() => Student)
  @UseGuards(GqlAuthGuard)
  async studentProfile(@CurrentUser('sub') id: number) {
    return this.studentService.profile(id);
  }

  @Query(() => [Class])
  @UseGuards(GqlAuthGuard)
  async studentClasses(@CurrentUser('sub') studentId: number) {
    return this.studentService.getStudentClasses(studentId);
  }

  @Query(() => [Attendance])
  @UseGuards(GqlAuthGuard)
  async studentAttendance(@CurrentUser('sub') studentId: number) {
    return this.studentService.getStudentAttendance(studentId);
  }

  @Query(() => [Grade])
  @UseGuards(GqlAuthGuard)
  async studentGrades(@CurrentUser('sub') studentId: number) {
    return this.studentService.getStudentGrades(studentId);
  }

  @Mutation(() => Student)
  @UseGuards(GqlAuthGuard)
  async updateStudentProfile(@Args('data') data: UpdateStudentInput) {
    return this.studentService.updateProfile(data);
  }
}
