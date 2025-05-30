import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailtrapModule } from 'src/mailtrap/mailtrap.module';
import { StudentModule } from 'src/student/student.module';
import { UploadModule } from 'src/upload/upload.module';
import { TeacherModule } from 'src/teacher/teacher.module';
import { SubjectModule } from 'src/subject/subject.module';
import { ClassModule } from 'src/class/class.module';
import { AssigmentModule } from 'src/assigment/assigment.module';
import { AttendanceModule } from 'src/attendance/attendance.module';
import { GradeModule } from 'src/grade/grade.module';
import { EnrollmentModule } from 'src/enrollment/enrollment.module';
import { ParentModule } from 'src/parent/parent.module';
import { ParentStudentModule } from 'src/parent-student/parent-student.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      subscriptions: {
        'graphql-ws': {
          path: '/graphql',
        },
      },
    }),
    PrismaModule,
    MailtrapModule,
    StudentModule,
    UploadModule,
    TeacherModule,
    SubjectModule,
    ClassModule,
    AttendanceModule,
    AssigmentModule,
    GradeModule,
    EnrollmentModule,
    ParentModule,
    ParentStudentModule,
  ],
  providers: [AppResolver, AppService],
})
export class AppModule {}
