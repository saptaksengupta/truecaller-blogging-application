import { Injectable, HttpService, HttpException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IBlogApi } from '../../entity/blog-api.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from '../../entity/post.entity';
@Injectable()
export class TrueCallerApiService implements IBlogApi {
    private baseUrl: string;
    private posts: Post[];
    constructor(private httpService: HttpService, private configService: ConfigService) {
        this.baseUrl = this.configService.get('TRUE_CALLER_API_BASE_URL');
    }

    getPostsUrl(queryParams = undefined): string {
        let url = `${this.baseUrl}/${this.configService.get('SITE_ID')}/posts/?number=${this.configService.get('postLimit')}&pretty=true`;

        if (queryParams && queryParams.category) {
            url = `${url}&category=${queryParams.category}`;
        }

        if (queryParams && queryParams.tag) {
            url = `${url}&tag=${queryParams.tag}`;
        }
        return url;
    }

    getRelatedPostsUrl(postId: number): string {
        return `${this.baseUrl}/${this.configService.get('SITE_ID')}/posts/${postId}/related/?size=3&pretty=true`;
    }

    getPostDetailsUrl(postId: number): string {
        return `${this.baseUrl}/${this.configService.get('SITE_ID')}/posts/${postId}`;
    }

    getPosts(queryParams): Observable<Post[]> {
        const postResponse = this.httpService.get(this.getPostsUrl(queryParams)).pipe(
            map(resp => {
                return resp.data;
            })
        )
        return postResponse;
    }

    getPostDetails(postId: number): Observable<Post[]> {
        const postResponse = this.httpService.get(this.getPostDetailsUrl(postId)).pipe(
            map(resp => {
                return resp.data;
            })
        )
        return postResponse;
    }

    getRelatedPosts(postId: number): Observable<Post[]> {
        const postResponse = this.httpService.post(this.getRelatedPostsUrl(postId)).pipe(
            map(resp => {
                return resp.data;
            })
        )
        return postResponse;
    }

}