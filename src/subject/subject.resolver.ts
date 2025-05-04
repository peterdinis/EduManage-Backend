import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SubjectService } from './subject.service';
import { Subject } from './entities/Subject';
import { CreateSubjectInput } from './dto/create-subject-dto';
import { UpdateSubjectInput } from './dto/update-subject.dto';

@Resolver(() => Subject)
export class SubjectResolver {
  constructor(private readonly subjectService: SubjectService) {}

  @Mutation(() => Subject)
  createSubject(@Args('input') input: CreateSubjectInput) {
    return this.subjectService.create(input);
  }

  @Query(() => [Subject], { name: 'subjects' })
  findAllSubjects() {
    return this.subjectService.findAll();
  }

  @Query(() => Subject, { name: 'subject' })
  findSubject(@Args('id', { type: () => Int }) id: number) {
    return this.subjectService.findOne(id);
  }

  @Mutation(() => Subject)
  updateSubject(@Args('input') input: UpdateSubjectInput) {
    return this.subjectService.update(input.id, input);
  }

  @Mutation(() => Subject)
  removeSubject(@Args('id', { type: () => Int }) id: number) {
    return this.subjectService.remove(id);
  }
}
