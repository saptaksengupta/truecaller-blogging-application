import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<> {
    data: any;
    status: number;
    dateTime: string;
    method: string;
    path: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response> {
    intercept(context: ExecutionContext, next: CallHandler): any {
        return next.handle().pipe(map(data => {
            const ctx = context.switchToHttp();
            const url = ctx.getRequest().url;
            const response = ctx.getResponse();
            const method = ctx.getRequest().method;
            const httpResponse = { status: data.code, dateTime: new Date().toISOString(), method: method, path: url, response: data.data };
            return response.json(httpResponse);
        }))
    }
}