import { Injectable, Logger } from '@nestjs/common';
import { Post } from '../entity/post.entity';
import { BlogApiFactory } from 'src/factory/blog-api.factory';
import { map } from 'rxjs/operators'

@Injectable()
export class PostService {

    private blogApiProvider;
    private posts: Post[] = [];
    private postsHash = {};
    private postsResp = {};
    private postDetails: Post;
    private relatedPosts = [];
    constructor(
        private blogApiFactory: BlogApiFactory
    ) {
        this.blogApiProvider = this.blogApiFactory.getApiInstance();
    }

    async getPosts(queryParams = undefined): Promise<Post[]> {
        return this.blogApiProvider.getPosts(queryParams).pipe(map((resp: any) => {
            if (resp.posts) {
                this.makePostsEmpty();
                resp.posts.map((receivedPost) => {
                    this.processPostsForInternalUse(receivedPost);
                });
                return this.posts;
            }
        })).toPromise();
    }

    async fetchPostDetails(postId): Promise<Post> {

        const postDet = this.blogApiProvider.getPostDetails(postId).pipe(map((resp) => {
            if (resp) {
                this.postDetails = this.filterPostFromResp(resp);
            }
            return this.postDetails;
        }));
        return postDet.toPromise();
    }

    async getRelatedPosts(postId: number): Promise<Array<number>> {
        return this.blogApiProvider.getRelatedPosts(postId).pipe(map((resp: any) => {
            if (resp.hits) {
                resp.hits.map((relatedPost) => {
                    if (this.relatedPosts.length < 3) {
                        const rp = relatedPost.fields.post_id;
                        this.relatedPosts.push(rp);
                    }
                });
            }
            return this.relatedPosts;
        })).toPromise();
    }

    getRelatedPostsByIds(postIds: []): Promise<Post[]> {
        const det = this.blogApiProvider.getAllRelatedPostDetails(postIds).pipe(map((resp: any) => {
            let det: Post[] = [];
            if (resp) {
                resp.map(postdet => {
                    det.push(this.filterPostFromResp(postdet));
                })
            }
            return det;
        }));
        return det.toPromise();
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
