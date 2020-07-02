import { Observable } from "rxjs";
import { Post } from './post.entity';

export interface IBlogApi {

    // General api related methods, that require in general, like create, get, etc...
    getPosts(postLimit: number): Observable<Post[]>;

    getAllRelatedPostDetails(postId: number): any;

    getRelatedPosts(postId: number): Observable<any>;

    getPostDetails(postId: number): Observable<Post>;

    getSiteTags(): Observable<any>;

}