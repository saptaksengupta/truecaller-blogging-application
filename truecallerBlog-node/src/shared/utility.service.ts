import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UtilityService {

    constructor(private configService: ConfigService){}

    isValidUser(siteId: string): boolean {
        if (siteId === this.configService.get('SITE_ID')) 
            return true;
        return false;
    }
}
