import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthException } from "src/exceptions/auth.exception";
import { AuthService } from "../auth.service";
import { UserDto } from "../dtos/user.dto";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private authService: AuthService) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const token: string = this.authService.getJwtInHeader(req)
            const user: UserDto = this.authService.verifyUser(token);
            
            const user_id: string = req.params.user_id
            const isIdEquals: boolean = user.id === Number(user_id)

            if(!user_id || !isIdEquals) {
                throw AuthException.UnauthorizedError();
            }
            req.user = user;

            return true;
        } catch (err) {
            throw AuthException.UnauthorizedError();
        }
    }

}