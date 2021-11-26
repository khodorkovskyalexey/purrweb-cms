import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthTokensDto } from './dtos/auth-tokens.dto';
import { AuthUsersDto } from './dtos/auth-user.dto';
import { AuthException } from 'src/exceptions/auth.exception';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    getJwtInHeader(req: Request): string {
        const authHeader = req.headers['authorization'];
        const bearer = authHeader.split(' ')[0];
        const token = authHeader.split(' ')[1];

        if (bearer !== 'Bearer' || !token) {
            throw AuthException.UnauthorizedError();
        }

        return token;
    }

    verifyUser(token: string): UserDto {
        return this.jwtService.verify(token);
    }

    generateResponse(user: UserDto): AuthUsersDto {
        const tokens: AuthTokensDto = this.generateToken(user);
        return new AuthUsersDto(user, tokens);
    }

    private generateToken(user: UserDto): AuthTokensDto {
        const payload = { id: user.id,  email: user.email };
        return {
            accessToken: this.jwtService.sign(payload)
        }
    }
}
