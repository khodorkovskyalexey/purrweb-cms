import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { Auth0Service } from "src/auth0/auth0.service";
import { AuthException } from "src/exceptions/auth.exception";
import { CreateUserDto } from "src/users/dtos/create-user.dto";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtAuth0Guard extends AuthGuard('jwt') {
    constructor(
        private auth0Service: Auth0Service,
        private usersService: UsersService
    ) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: Request = context.switchToHttp().getRequest();
        try {
            await super.canActivate(context);

            const userFromAuth0 = await this.auth0Service.getUser(req.headers.authorization);
            const user: CreateUserDto = new CreateUserDto(userFromAuth0);
            const userFromDB = await this.usersService.findByEmail(user.email, { select: ['id'] });

            req.user = { id: userFromDB.id, ...user };
            console.log(req.user);
            
        } catch (error) {
            console.log(error);
            throw AuthException.UnauthorizedError();
        }
        return true;
    }
    
}