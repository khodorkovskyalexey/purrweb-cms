import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { Auth0Service } from "src/auth0/auth0.service";
import { AuthException } from "src/exceptions/auth.exception";

@Injectable()
export class JwtAuth0Guard extends AuthGuard('jwt') {
    constructor(private auth0Service: Auth0Service) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: Request = context.switchToHttp().getRequest();
        try {
            await super.canActivate(context);
            const user = await this.auth0Service.getUser(req.headers.authorization);
            req.user = user;
        } catch (error) {
            throw AuthException.UnauthorizedError();
        }
        return true;
    }
    
}