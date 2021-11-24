import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { HashPasswordMiddleware } from './middlewares/hash-password.middleware';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || "SECRET_KEY",
      signOptions: {
        expiresIn: "8h"
      }
    })
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
  exports: [UsersService, AuthService, JwtModule],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HashPasswordMiddleware)
      .exclude({ path: "users/(.*)", method: RequestMethod.GET }, { path: "users/(.*)", method: RequestMethod.DELETE } )
      .forRoutes(UsersController)
  }
}
