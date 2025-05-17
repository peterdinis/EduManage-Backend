import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CreateEnrollmentInput } from './dto/create-enrollment.input';
import { EnrollmentService } from './enrollement.service';
import { Enrollment } from './entity/enrollment.entity';

@Resolver(() => Enrollment)
export class EnrollmentResolver {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Mutation(() => Enrollment)
  createEnrollment(@Args('input') input: CreateEnrollmentInput) {
    return this.enrollmentService.create(input);
  }

  @Query(() => [Enrollment])
  allEnrollments() {
    return this.enrollmentService.findAll();
  }

  @Query(() => Enrollment)
  enrollment(@Args('id', { type: () => Int }) id: number) {
    return this.enrollmentService.findOne(id);
  }

  @Mutation(() => Enrollment)
  removeEnrollment(@Args('id', { type: () => Int }) id: number) {
    return this.enrollmentService.remove(id);
  }
}