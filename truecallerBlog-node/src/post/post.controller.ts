import { Controller, Get, Headers, HttpException, HttpStatus, Param, Query, Logger } from '@nestjs/common';
import { ERROR_STRINGS } from '../shared/global-strings.constant';
import { PostService } from './post.service';
import { UtilityService } from '../shared/utility.service';
import { DefaultHttpReturnType } from 'src/shared/global.type';

@Controller('posts')
export class PostController {

    constructor(private postService: PostService, private utilityService: UtilityService) { }

    @Get()
    async getPosts(@Headers() headers, @Query() queryParams: any): Promise<DefaultHttpReturnType> {

        let slug:string;
        let tag:string;
        let searchQueryObj:object = {};
        if (queryParams.slug) {
            searchQueryObj['category'] =  queryParams.slug;
        } else if (queryParams.tag) {
            searchQueryObj['tag'] =  queryParams.tag;
        }
        try {
            const siteId = headers.siteid;
            const isValidUser = await this.utilityService.isValidUser(siteId);
            if (!isValidUser)
                throw new HttpException(ERROR_STRINGS.SITE_ID_INVALID, HttpStatus.BAD_REQUEST);

            let posts;
            if (searchQueryObj) {
                posts = await this.postService.getPosts(searchQueryObj);
            } else {
                posts = await this.postService.getPosts();
            }
            
            return { data: posts, code: HttpStatus.OK };
        } catch (error) {
            console.log(error);
        }
    }

    @Get(':postId')
    async getPostDetails(@Headers() headers, @Param() params): Promise<DefaultHttpReturnType> {

        try {
            const siteId = headers.siteid;
            const postId = params.postId
            const isValidUser = await this.utilityService.isValidUser(siteId);
            if (!isValidUser)
                throw new HttpException(ERROR_STRINGS.SITE_ID_INVALID, HttpStatus.BAD_REQUEST);

            const postDetails = await this.postService.fetchPostDetails(postId);
            const relatedPosts = await this.postService.getRelatedPosts(postId);
            if (postDetails && relatedPosts.length > 0) {
                postDetails.relatedPosts = relatedPosts;
            }
            return { data: postDetails, code: HttpStatus.OK };
        } catch (error) {
            console.log(error);
        }
    }

    @Get(':postId/categories')
    async getPostCategories(@Headers() headers, @Param() params): Promise<DefaultHttpReturnType> {

        try {
            const siteId = headers.siteid;
            const postId = params.postId
            const isValidUser = await this.utilityService.isValidUser(siteId);
            if (!isValidUser)
                throw new HttpException(ERROR_STRINGS.SITE_ID_INVALID, HttpStatus.BAD_REQUEST);

            const postCategories = this.postService.getPostCategories(postId);
            return { data: postCategories, code: HttpStatus.OK };
        } catch (error) {
            console.log(error);
        }
    }

    @Get(':postId/related')
    async getRelatedPosts(@Headers() headers, @Param() params): Promise<DefaultHttpReturnType> {

        try {
            const siteId = headers.siteid;
            const postId = params.postId
            const isValidUser = await this.utilityService.isValidUser(siteId);
            if (!isValidUser)
                throw new HttpException(ERROR_STRINGS.SITE_ID_INVALID, HttpStatus.BAD_REQUEST);

            const relatedPosts = await this.postService.getRelatedPosts(postId);
            return { data: relatedPosts, code: HttpStatus.OK };
        } catch (error) {
            console.log(error);
        }
    }

}
