import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { Auth0Controller } from './auth0.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [Auth0Controller],
  providers: [JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class Auth0Module {}
