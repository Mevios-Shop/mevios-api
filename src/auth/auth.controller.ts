import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Post, UseGuards, Request } from '@nestjs/common';

@Controller()
export class AuthController { 

    constructor(private authService: AuthService) {
        
    }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req: any) {
        return this.authService.login(req.user);
    }
}
