import { Injectable } from '@nestjs/common';
import { BlogApiFactory } from 'src/factory/blog-api.factory';
import { map } from 'rxjs/operators';

@Injectable()
export class TagService {
    private blogApiProvider;
    constructor(
        private blogApiFactory: BlogApiFactory
    ) {
        this.blogApiProvider = this.blogApiFactory.getApiInstance();
    }

    getSiteTags(): Promise<[]>{
        return this.blogApiProvider.getSiteTags().pipe(map((resp: any) => {
            return resp.tags;
        })).toPromise();
    }   
}
