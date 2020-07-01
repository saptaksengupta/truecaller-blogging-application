import { Module, HttpModule, HttpService } from '@nestjs/common';

import { PostService } from './post.service';
import { PostController } from './post.controller';

import { UtilityService } from 'src/shared/utility.service';

import { BlogApiFactory } from 'src/factory/blog-api.factory';
import { TrueCallerApiService } from 'src/api/true-caller-api/trucaller-blog.api.service';

@Module({
  imports: [HttpModule],
  providers: [
    PostService, 
    UtilityService, 
    BlogApiFactory, 
    TrueCallerApiService
  ],
  controllers: [PostController]
})
export class PostModule {}
