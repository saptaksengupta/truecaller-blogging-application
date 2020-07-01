export interface Post {
    id: number;
    title: string;
    thumbnail: string;
    excerpt: string;
    content: string;
    date: Date;
    categories: object;
    relatedPosts?: number[];
}