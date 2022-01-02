import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UniqueEmailGuard } from './guards/unique-email.guard';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';
import { VerificationUserGuard } from './guards/verification-user.guard';
import { Auth0Service } from 'src/auth0/auth0.service';
import { Request } from 'express';
import { JwtAuth0Guard } from 'src//guards/jwt-auth0.guard';
import { UserToReqBodyGuard } from './guards/user-to-req-body.guard';
import { AuthGuard } from '@nestjs/passport';

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
        // create: CreateUserDto,
        // update: UpdateUserDto,
        // replace: UpdateUserDto,
    },
    routes: {
        exclude: ['createManyBase', 'recoverOneBase', 'deleteOneBase', 'updateOneBase', 'replaceOneBase'],
        // replaceOneBase: {
        //     decorators: [UseGuards(JwtAuthGuard, VerificationUserGuard ,HashPasswordGuard)],
        // },
        // updateOneBase: {
        //     decorators: [UseGuards(JwtAuthGuard, VerificationUserGuard ,HashPasswordGuard)],
        // },
        createOneBase: {
            decorators: [UseGuards(JwtAuth0Guard, UserToReqBodyGuard, UniqueEmailGuard)],
        },
        // deleteOneBase: {
        //     decorators: [UseGuards(JwtAuthGuard, VerificationUserGuard)],
        // }
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

    @UseGuards(AuthGuard('jwt'))
    @Get('jwt')
    async check(@Req() req: Request) {
        return req.user;
    }
}
