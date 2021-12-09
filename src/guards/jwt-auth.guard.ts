import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthException } from "src/exceptions/auth.exception";
import { AuthService } from "../users/auth.service";
import { UserDto } from "../users/dtos/user.dto";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private authService: AuthService) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const token: string = this.authService.getJwtInHeader(req);
            const user: UserDto = this.authService.verifyUser(token);
            
            if(!user.id) {
                throw AuthException.UnauthorizedError();
            }
            req.user = user;
            

            return true;
        } catch (err) {
            throw AuthException.UnauthorizedError();
        }
    }

}