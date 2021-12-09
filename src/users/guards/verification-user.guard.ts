import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthException } from "src/exceptions/auth.exception";

@Injectable()
export class VerificationUserGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();

        if(req.user?.id !== Number(req.params?.user_id)) {
            throw AuthException.UnauthorizedError();
        }

        return true;
    }

}