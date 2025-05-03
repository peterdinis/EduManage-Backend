import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs';
import { LoggerInterceptor } from './shared/interceptor/logger.interceptor';
import { CatchEverythingFilter } from './shared/filters/catch-everything.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new CatchEverythingFilter());
  app.useGlobalInterceptors(new LoggerInterceptor());
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 5 }));
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
