import { Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';

import { TrueCallerApiService } from "../api/true-caller-api/trucaller-blog.api.service";

@Injectable()
export class BlogApiFactory {
    constructor(
        private truCallerApi: TrueCallerApiService,
        private configService: ConfigService
    ) { }

    public getApiInstance() {
        const selectedApiProvider: string = this.configService.get('CURRENT_BLOG_PROVIDER');
        switch (selectedApiProvider) {
            case 'TRUECALLER':
                return this.truCallerApi;
                break;
            case 'SOME_OTHER_PROVIDER':
                // For demo only, True caller is the only working example,
                // this is for multi provider Experience.
                // we might return another integrated active blog provider instance 
                // other than truecaller
                return;
                break;
        }
    }
}