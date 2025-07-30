import { API_VERSION } from '@/constant';
import { ResponseInterface } from '@/types';
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable } from 'rxjs';

@Injectable()
export class DataResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const responseData = data?.data ? data?.data : data;
        const message = data?.message ?? 'Request processed successfully.';

        return {
          apiVersion: API_VERSION,
          success: true,
          data: responseData,
          message,
        } as ResponseInterface;
      }),
      catchError((err) => {
        const message = err?.message || 'Something went wrong';
        const status = err?.status || 500;

        throw new HttpException(
          {
            apiVersion: API_VERSION,
            success: false,
            data: null,
            message,
          } as ResponseInterface,
          status,
        );
      }),
    );
  }
}
