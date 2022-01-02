import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { AuthUsersDto } from './dtos/auth-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { HashPasswordGuard } from './guards/hash-password.guard';
import { UniqueEmailGuard } from './guards/unique-email.guard';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';
import { VerificationUserGuard } from './guards/verification-user.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { Auth0Service } from 'src/auth0/auth0.service';
import { Request } from 'express';
import { JwtAuth0Guard } from 'src/guards/jwt-auth0.guard';

@ApiTags('User module')
@Crud({
    model: {
        type: User,
    },
    params: {
        user_id: {
            field: 'id',
            type: 'number',
            primary: true,
        }
    },
    dto: {
        create: CreateUserDto,
        update: UpdateUserDto,
        replace: UpdateUserDto,
    },
    routes: {
        exclude: ['createManyBase'],
        replaceOneBase: {
            decorators: [UseGuards(JwtAuthGuard, VerificationUserGuard ,HashPasswordGuard)],
        },
        updateOneBase: {
            decorators: [UseGuards(JwtAuthGuard, VerificationUserGuard ,HashPasswordGuard)],
        },
        createOneBase: {
            decorators: [UseGuards(UniqueEmailGuard, HashPasswordGuard)],
        },
        deleteOneBase: {
            decorators: [UseGuards(JwtAuthGuard, VerificationUserGuard)],
        }
    },
    query: {
        join: {
            events: {
                eager: true
            }
        }
    }
})
@Controller('users')
export class UsersController implements CrudController<User> {
    constructor(public service: UsersService, public auth0service: Auth0Service) {}
    
    @ApiOperation({ summary: 'Login' })
    @ApiResponse({ status: 200, type: [AuthUsersDto] })
    @Post('login')
    async login(@Body() userDto: CreateUserDto): Promise<AuthUsersDto> {
        return this.service.login(userDto);
    }

    @UseGuards(JwtAuth0Guard)
    @Get('jwt')
    async check(@Req() req: Request) {
        return req.user;
    }
}
