import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { Auth0Service } from '../auth0.service';
import { AUTH0_AUDIENCE, AUTH0_ISSUER_URL } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(public readonly service: Auth0Service) {
        super({
            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `${AUTH0_ISSUER_URL}/.well-known/jwks.json`,
            }),
            audience: AUTH0_AUDIENCE,
            issuer: `${AUTH0_ISSUER_URL}/`,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            algorithms: ['RS256'],
        })
    }

    async validate(payload: any) {
        return payload;
    }
}
