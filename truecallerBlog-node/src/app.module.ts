import { Module, HttpModule, HttpService } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config } from '../config';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TransformInterceptor } from './shared/transform.interseptor';
import { HttpErrorFilter } from './shared/http-error.filter';
import { PostModule } from './post/post.module';
import { TagModule } from './tag/tag.module';
import { UtilityService } from './shared/utility.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    PostModule,
    TagModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor
    },
    UtilityService,
  ],
})
export class AppModule { }
