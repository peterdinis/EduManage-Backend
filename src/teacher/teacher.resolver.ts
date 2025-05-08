import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TeacherService } from './teacher.service';
import { CreateTeacherInput } from './dto/create-teacher.dto';
import { UpdateTeacherInput } from './dto/update-teacher.dto';
import { Teacher } from './entities/teacher.model';
import { LoginTeacherInput } from './dto/login-teacher.input';
import { AuthResponse } from './dto/auth-response.dto';

@Resolver(() => Teacher)
export class TeacherResolver {
  constructor(private readonly teacherService: TeacherService) {}

  @Query(() => [Teacher])
  async teachers() {
    return this.teacherService.findAll();
  }

  @Query(() => Teacher)
  async teacher(@Args('id', { type: () => Int }) id: number) {
    return this.teacherService.findOne(id);
  }

  @Mutation(() => Teacher)
  async createTeacher(@Args('data') data: CreateTeacherInput) {
    return this.teacherService.create(data);
  }

  @Mutation(() => Teacher)
  async updateTeacher(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: UpdateTeacherInput,
  ) {
    return this.teacherService.update(id, data);
  }

  @Mutation(() => Teacher)
  async deleteTeacher(@Args('id', { type: () => Int }) id: number) {
    return this.teacherService.remove(id);
  }

  @Mutation(() => AuthResponse)
  async registerTeacher(@Args('data') data: CreateTeacherInput) {
    return this.teacherService.register(data);
  }

  @Mutation(() => AuthResponse)
  async loginTeacher(@Args('data') data: LoginTeacherInput) {
    return this.teacherService.login(data);
  }

  @Query(() => Teacher)
  async teacherProfile(
    @Args('teacherId', { type: () => Int }) teacherId: number,
  ) {
    return this.teacherService.profile(teacherId);
  }
}
