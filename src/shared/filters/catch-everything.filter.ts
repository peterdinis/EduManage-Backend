import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { GqlArgumentsHost } from '@nestjs/graphql';
  
  @Catch()
  export class CatchEverythingFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void {
      const gqlHost = GqlArgumentsHost.create(host);
  
      const ctx = gqlHost.getContext();
      const request = ctx.req;
  
      const httpStatus =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
  
      const responseBody = {
        statusCode: httpStatus,
        timestamp: new Date().toISOString(),
        path: request?.url,
        message:
          exception instanceof HttpException
            ? exception.getResponse()
            : 'Internal server error',
      };
  
      console.error('GraphQL Error:', responseBody);
  
      throw new HttpException(responseBody, httpStatus);
    }
  }
  