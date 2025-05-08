import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ClassService } from './class.service';
import { CreateClassInput } from './dto/create-class-input.dto';
import { UpdateClassInput } from './dto/update-class-input.dto';
import { ClassEntity } from './entities/class.entity';

@Resolver(() => ClassEntity)
export class ClassResolver {
  constructor(private readonly classService: ClassService) {}

  @Query(() => [ClassEntity])
  getAllClasses() {
    return this.classService.findAll();
  }

  @Query(() => ClassEntity)
  getClass(@Args('id', { type: () => Int }) id: number) {
    return this.classService.findOne(id);
  }

  @Mutation(() => ClassEntity)
  createClass(@Args('data') data: CreateClassInput) {
    return this.classService.create(data);
  }

  @Mutation(() => ClassEntity)
  updateClass(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: UpdateClassInput,
  ) {
    return this.classService.update(id, data);
  }

  @Mutation(() => ClassEntity)
  deleteClass(@Args('id', { type: () => Int }) id: number) {
    return this.classService.remove(id);
  }
}
