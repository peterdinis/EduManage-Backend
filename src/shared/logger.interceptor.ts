import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const gqlCtx = GqlExecutionContext.create(context);
    const info = gqlCtx.getInfo();
    const args = gqlCtx.getArgs();

    console.log(
      `GraphQL Request - ${info.parentType.name}.${info.fieldName}`,
      args,
    );

    return next.handle().pipe(
      tap((data) => {
        console.log(`GraphQL Response - ${info.fieldName}`, data);
      }),
    );
  }
}
