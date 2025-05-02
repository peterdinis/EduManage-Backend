import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { LoginInput } from './dto/login-student-input';
import { RegisterStudentInput } from './dto/register-student-input';
import { Student } from './entities/student.entity';
import { Attendance } from './entities/attendence.entity';
import { Class } from './entities/class.entity';
import { Grade } from './entities/grade.entity';

@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Mutation(() => Student)
  async registerStudent(
    @Args('data') data: RegisterStudentInput,
  ): Promise<Student> {
    return this.studentService.register(data);
  }

  @Mutation(() => Student)
  async loginStudent(@Args('data') data: LoginInput): Promise<Student> {
    return this.studentService.login(data);
  }

  @Query(() => Student)
  async studentProfile(@Args('id') id: string): Promise<Student> {
    return this.studentService.profile(id);
  }

  @Query(() => [Class])
  async studentClasses(
    @Args('studentId', { type: () => Int }) studentId: number,
  ) {
    return this.studentService.getStudentClasses(studentId);
  }

  @Query(() => [Attendance])
  async studentAttendance(
    @Args('studentId', { type: () => Int }) studentId: number,
  ) {
    return this.studentService.getStudentAttendance(studentId);
  }

  @Query(() => [Grade])
  async studentGrades(
    @Args('studentId', { type: () => Int }) studentId: number,
  ) {
    return this.studentService.getStudentGrades(studentId);
  }
}
