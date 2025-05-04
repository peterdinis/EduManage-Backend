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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
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
  ],
  providers: [AppResolver, AppService],
})
export class AppModule {}