import { Controller, Get, Headers, Res, HttpStatus } from '@nestjs/common';
import { ERROR_STRINGS } from '../shared/global-strings.constant';
import { TagService } from './tag.service';
import { UtilityService } from 'src/shared/utility.service';

import {Response} from 'express';

@Controller('tags')
export class TagController {

    constructor(private tagService: TagService, private utilityService: UtilityService) { }

    @Get()
    async getAllTags(@Headers() headers, @Res() resp: Response): Promise<Response> {
        const siteId = headers.siteid;
        const isValidUser = await this.utilityService.isValidUser(siteId);
        if (!isValidUser)
            return resp.status(HttpStatus.BAD_REQUEST).json({response: ERROR_STRINGS.SITE_ID_INVALID});

        let siteTags = [];
        await this.tagService.getSiteTags().then((resp) => {
            siteTags = resp;
        }).catch((err) => {
            console.log(err);
        })
        return resp.status(HttpStatus.OK).json({ response: siteTags });
    }
}
