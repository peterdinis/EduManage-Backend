import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { LoginInput } from './dto/login-student-input';
import { RegisterStudentInput } from './dto/register-student-input';
import { Student } from './entities/student.entity';
import { Attendance } from './entities/attendence.entity';
import { Class } from './entities/class.entity';
import { Grade } from './entities/grade.entity';
import { UpdateStudentInput } from './dto/update-student-profile.dto';

@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Mutation(() => Student)
  async registerStudent(
    @Args('data') data: RegisterStudentInput,
  ) {
    return this.studentService.register(data);
  }

  @Mutation(() => Student)
  async loginStudent(@Args('data') data: LoginInput) {
    return this.studentService.login(data);
  }

  @Query(() => Student)
  async studentProfile(@Args('id', { type: () => Int }) id: number){
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

  @Mutation(() => Student)
  async updateStudentProfile(
    @Args('data') data: UpdateStudentInput,
  ){
    return this.studentService.updateProfile(data);
  }
}
