import { ObjectType, Field, Int } from '@nestjs/graphql';
import { SubjectEntity } from 'src/subject/entities/Subject';

@ObjectType()
export class AssigmentEntity {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  dueDate: Date;

  @Field(() => Int)
  subjectId: number;

  @Field(() => SubjectEntity)
  subject: SubjectEntity;

  @Field()
  createdAt: Date;
}