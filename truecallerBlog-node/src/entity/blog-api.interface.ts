import { Observable } from "rxjs";
import { Post } from './post.entity';

export interface IBlogApi {

    // General api related methods, that require in general, like create, get, etc...
    getPosts(postLimit: number): Observable<Post[]>;

}