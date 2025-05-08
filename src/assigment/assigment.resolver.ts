import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AssigmentService } from './assigment.service';
import { AssigmentEntity } from './entity/assigment.entity';
import { CreateAssigmentInput } from './dto/create-assigment.dto';
import { UpdateAssigmentInput } from './dto/update-assigment.dto';
import { AssigmentSearchInput } from './dto/search-input.dto';

@Resolver(() => AssigmentEntity)
export class AssigmentResolver {
  constructor(private readonly assigmentService: AssigmentService) {}

  @Mutation(() => AssigmentEntity)
  createAssigment(@Args('data') data: CreateAssigmentInput) {
    return this.assigmentService.create(data);
  }

  @Query(() => [AssigmentEntity])
  findAllAssigments(
    @Args('searchInput', { nullable: true }) searchInput?: AssigmentSearchInput,
  ) {
    return this.assigmentService.findAll(searchInput);
  }

  @Query(() => AssigmentEntity)
  findAssigment(@Args('id', { type: () => Int }) id: number) {
    return this.assigmentService.findOne(id);
  }

  @Mutation(() => AssigmentEntity)
  updateAssigment(@Args('data') data: UpdateAssigmentInput) {
    return this.assigmentService.update(data.id, data);
  }

  @Mutation(() => AssigmentEntity)
  removeAssigment(@Args('id', { type: () => Int }) id: number) {
    return this.assigmentService.remove(id);
  }
}
