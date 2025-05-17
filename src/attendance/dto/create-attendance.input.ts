import { InputType, Field, Int } from '@nestjs/graphql';
import { IsDateString, IsInt, IsString } from 'class-validator';

@InputType()
export class CreateAttendanceInput {
  @IsDateString()
  @Field()
  date: string;

  @IsString()
  @Field()
  status: string;

  @IsInt()
  @Field(() => Int)
  studentId: number;

  @IsInt()
  @Field(() => Int)
  classId: number;
}
