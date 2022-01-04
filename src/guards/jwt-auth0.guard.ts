import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { Auth0Service } from "src/auth0/auth0.service";
import { AuthException } from "src/exceptions/auth.exception";
import { CreateUserDto } from "src/users/dtos/create-user.dto";
import { User } from "src/users/entities/users.entity";
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
            
            let userFromDB: User = await this.usersService.findBySubId(user.sub_id);
            if(!userFromDB) {
                userFromDB = await this.usersService.create(user);
            }

            const relevance = this.usersService.checkRelevance(user, userFromDB);
            if(!relevance[0]) {
                let updateUserData = {};
                relevance[1].forEach(key => { updateUserData[key] = user[key] });
                await this.usersService.update(userFromDB.id, updateUserData as CreateUserDto);
            }
            
            req.user = { id: userFromDB.id, ...user };
        } catch (error) {
            throw AuthException.UnauthorizedError();
        }
        return true;
    }
    
}