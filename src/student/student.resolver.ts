import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { LoginInput } from './dto/login-student-input';
import { RegisterStudentInput } from './dto/register-student-input';
import { Student } from './student.entity';

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
}
