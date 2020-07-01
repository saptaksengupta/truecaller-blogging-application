import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Post } from '../entity/post.entity';
import { BlogApiFactory } from 'src/factory/blog-api.factory';
import { title } from 'process';
import { posix } from 'path';

@Injectable()
export class PostService {

    private blogApiProvider;
    private posts: Post[] = [];
    private postsHash = {};
    private postsResp = {};
    private postDetails: Post;
    private relatedPosts = [];
    constructor(
        private configService: ConfigService,
        private blogApiFactory: BlogApiFactory
    ) {
        this.blogApiProvider = this.blogApiFactory.getApiInstance();
    }

    async getPosts(queryParams = undefined): Promise<Post[]> {
        this.blogApiProvider.getPosts(queryParams).subscribe((resp) => {
            if (resp.posts) {
                this.makePostsEmpty();
                resp.posts.map((receivedPost) => {
                    this.processPostsForInternalUse(receivedPost);
                });
            }
        });
        return await this.posts;
    }

    async fetchPostDetails(postId): Promise<Post> {
        await this.blogApiProvider.getPostDetails(postId).subscribe(async (resp) => {
            if (resp) {
                this.postDetails =  await this.filterPostFromResp(resp);
            }
        });
        return this.postDetails;
    }

    async getRelatedPosts(postId: number): Promise<Array<number>> {
        await this.blogApiProvider.getRelatedPosts(postId).subscribe(async (resp) => {
            if (resp.hits) {
                resp.hits.map((relatedPost) => {
                    if (this.relatedPosts.length < 3) {
                        const rp = relatedPost.fields.post_id;
                        this.relatedPosts.push(rp);
                    }
                });
            }
        });
        return this.relatedPosts;
    }

    async getPostBasedByRelationScore(relatedPost) {
        return await this.getPostDetails(relatedPost.post_id);
    }

    filterPostFromResp(receivedPost) {
        let post: Post = {
            id: receivedPost.ID,
            title: receivedPost.title,
            excerpt: receivedPost.excerpt,
            content: receivedPost.content,
            date: receivedPost.date,
            thumbnail: receivedPost.post_thumbnail.URL,
            categories: receivedPost.categories
        };
        return post;
    }

    async getPostDetails(postId: number) {
        if (this.postsHash[postId]) {
            return this.postsHash[postId];
        }
        return await this.fetchPostDetails(postId);
    }

    getPostCategories(postId) {
        return this.postsResp[postId].categories;
    }

    processPostsForInternalUse(receivedPost) {
        this.posts.push(this.filterPostFromResp(receivedPost));
        this.postsHash[receivedPost.ID] = this.filterPostFromResp(receivedPost);
        this.postsResp[receivedPost.ID] = receivedPost;
    }

    makePostsEmpty() {
        this.postsResp = {};
        this.posts = [];
        this.postsHash = {}
    }
}
