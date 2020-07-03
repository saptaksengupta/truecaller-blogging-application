import { Controller, Get, Headers, HttpException, HttpStatus, Param, Query, Logger, Body, Res } from '@nestjs/common';
import { ERROR_STRINGS } from '../shared/global-strings.constant';
import { PostService } from './post.service';
import { UtilityService } from '../shared/utility.service';
import { DefaultHttpReturnType } from 'src/shared/global.type';
import { Response } from 'express';
import { Post } from 'src/entity/post.entity';

@Controller('posts')
export class PostController {
    constructor(private postService: PostService, private utilityService: UtilityService) { }

    @Get()
    async getPosts(@Headers() headers, @Query() queryParams: any, @Res() resp: Response): Promise<Response> {

        let slug: string;
        let tag: string;
        let searchQueryObj: object = {};
        if (queryParams.slug) {
            searchQueryObj['category'] = queryParams.slug;
        } else if (queryParams.tag) {
            searchQueryObj['tag'] = queryParams.tag;
        }
        if (queryParams.before) {
            searchQueryObj['before'] = queryParams.before;
        }

        try {
            const siteId = headers.siteid;
            const isValidUser = await this.utilityService.isValidUser(siteId);
            if (!isValidUser)
                throw new HttpException(ERROR_STRINGS.SITE_ID_INVALID, HttpStatus.BAD_REQUEST);

            let posts;
            await this.postService.getPosts(searchQueryObj).then((resp) => {
                posts = resp;
            });
            return resp.status(HttpStatus.OK).json({ response: posts });

        } catch (error) {
            console.log(error);
        }
    }

    @Get(':postId')
    async getPostDetails(@Headers() headers, @Param() params, @Res() resp: Response): Promise<Response> {
        const siteId = headers.siteid;
        const postId = params.postId
        const isValidUser = await this.utilityService.isValidUser(siteId);
        if (!isValidUser)
            throw new HttpException(ERROR_STRINGS.SITE_ID_INVALID, HttpStatus.BAD_REQUEST);

        let postDetails: Post;
        await this.postService.fetchPostDetails(postId).then(async (resp) => {
            postDetails = resp;
            const relatedPosts = await this.postService.getRelatedPosts(postId);
            if (postDetails && relatedPosts.length > 0) {
                postDetails.relatedPosts = relatedPosts;
            }
        });

        return await resp.status(HttpStatus.OK).json({ response: postDetails });
    }

    @Get(':postId/categories')
    async getPostCategories(@Headers() headers, @Param() params, @Res() resp: Response): Promise<Response> {
        const siteId = headers.siteid;
        const postId = params.postId
        const isValidUser = await this.utilityService.isValidUser(siteId);
        if (!isValidUser)
            throw new HttpException(ERROR_STRINGS.SITE_ID_INVALID, HttpStatus.BAD_REQUEST);

        const postCategories = await this.postService.getPostCategories(postId);
        return resp.status(HttpStatus.OK).json({ response: postCategories });
    }

    @Get(':postId/related')
    async getRelatedPosts(@Headers() headers, @Param() params, @Query() queryParams, @Res() resp: Response): Promise<any> {
        const siteId = headers.siteid;
        const postIds = queryParams.postIds.split(',');
        const isValidUser = await this.utilityService.isValidUser(siteId);
        if (!isValidUser)
            throw new HttpException(ERROR_STRINGS.SITE_ID_INVALID, HttpStatus.BAD_REQUEST);

        let postDetails = [];
        await this.postService.getRelatedPostsByIds(postIds).then((resp) => {
            postDetails = resp
        })
        return resp.status(HttpStatus.OK).json({ response: postDetails });
    }

}
