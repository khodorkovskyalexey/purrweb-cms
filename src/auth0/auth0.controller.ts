import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class Auth0Controller {

    @Get('callback')
    async getCallback() {
        console.log('callback');
        return "callback";
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('protected')
    getProtected(): string {
        return 'This route is protected.';
    }

    @Get('public')
    getPublic() {
        return 'public';
    }
} 