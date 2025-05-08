import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SubjectService } from './subject.service';
import { SubjectEntity } from './entities/Subject';
import { CreateSubjectInput } from './dto/create-subject-dto';
import { UpdateSubjectInput } from './dto/update-subject.dto';

@Resolver(() => SubjectEntity)
export class SubjectResolver {
  constructor(private readonly subjectService: SubjectService) {}

  @Mutation(() => SubjectEntity)
  createSubject(@Args('input') input: CreateSubjectInput) {
    return this.subjectService.create(input);
  }

  @Query(() => [SubjectEntity], { name: 'subjects' })
  findAllSubjects() {
    return this.subjectService.findAll();
  }

  @Query(() => SubjectEntity, { name: 'subject' })
  findSubject(@Args('id', { type: () => Int }) id: number) {
    return this.subjectService.findOne(id);
  }

  @Mutation(() => SubjectEntity)
  updateSubject(@Args('input') input: UpdateSubjectInput) {
    return this.subjectService.update(input.id, input);
  }

  @Mutation(() => SubjectEntity)
  removeSubject(@Args('id', { type: () => Int }) id: number) {
    return this.subjectService.remove(id);
  }
}
