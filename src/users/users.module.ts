import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { UsersController } from './users.controller';
import { User } from './entities/users.entity';
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
export class UsersModule {}
