import { Module, HttpModule } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { UtilityService } from 'src/shared/utility.service';
import { BlogApiFactory } from 'src/factory/blog-api.factory';
import { TrueCallerApiService } from 'src/api/true-caller-api/trucaller-blog.api.service';

@Module({
  imports: [HttpModule],
  controllers: [TagController],
  providers: [
    TagService,
    UtilityService,
    BlogApiFactory,
    TrueCallerApiService
  ]
})
export class TagModule {}
