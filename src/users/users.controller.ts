import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';
import { VerificationUserGuard } from './guards/verification-user.guard';
import { Auth0Service } from 'src/auth0/auth0.service';
import { Request } from 'express';
import { JwtAuth0Guard } from 'src//guards/jwt-auth0.guard';

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
        update: UpdateUserDto,
        replace: UpdateUserDto,
    },
    routes: {
        exclude: ['createManyBase', 'createOneBase', 'recoverOneBase'],
        replaceOneBase: {
            decorators: [UseGuards(JwtAuth0Guard, VerificationUserGuard)],
        },
        updateOneBase: {
            decorators: [UseGuards(JwtAuth0Guard, VerificationUserGuard)],
        },
        deleteOneBase: {
            decorators: [UseGuards(JwtAuth0Guard, VerificationUserGuard)],
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

    @UseGuards(JwtAuth0Guard)
    @Get('jwt')
    async check(@Req() req: Request) {
        return req.user;
    }
}
