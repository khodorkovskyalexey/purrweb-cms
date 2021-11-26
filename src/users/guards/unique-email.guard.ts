import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthException } from "src/exceptions/auth.exception";
import { UsersService } from "../users.service";

@Injectable()
export class UniqueEmailGuard implements CanActivate {
    constructor(private readonly usersService: UsersService) {}

    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        try {    
            const email: string = req.body.email;
            const candidate = await this.usersService.findByEmail(email);
            if(candidate) {
                throw AuthException.BadRequest(`User with email: ${email} already exists`);
            }
            return true;
        } catch (err) {
            throw AuthException.BadRequest(err.message);
        }
    }
}