import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthTokensDto } from './dtos/auth-tokens.dto';
import { AuthUsersDto } from './dtos/auth-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './users.entity';
import { AuthException } from 'src/exceptions/auth.exception';

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

        return token
    }

    verifyUser(token: string): User {
        return this.jwtService.verify(token)
    }

    generateResponse(user: User): AuthUsersDto {
        const createdUser = new CreateUserDto(user);
        
        const tokens: AuthTokensDto = this.generateToken(user);
        return new AuthUsersDto(createdUser, tokens);
    }

    private generateToken(user: User): AuthTokensDto {
        const payload = { id: user.id,  email: user.email }
        return {
            accessToken: this.jwtService.sign(payload)
        }
    }
}
