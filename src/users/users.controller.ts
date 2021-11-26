import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { AuthUsersDto } from './dtos/auth-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { HashPasswordGuard } from './guards/hash-password.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UniqueEmailGuard } from './guards/unique-email.guard';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';

@ApiTags('User module')
@Crud({
    params: {
        user_id: {
            field: 'id',
            type: 'number',
            primary: true,
        }
    },
    model: {
        type: User,
    },
    dto: {
        create: CreateUserDto,
        update: UpdateUserDto,
        replace: UpdateUserDto,
    },
    routes: {
        exclude: ['createManyBase'],
        replaceOneBase: {
            decorators: [UseGuards(JwtAuthGuard ,HashPasswordGuard)],
        },
        updateOneBase: {
            decorators: [UseGuards(JwtAuthGuard ,HashPasswordGuard)],
        },
        createOneBase: {
            decorators: [UseGuards(UniqueEmailGuard, HashPasswordGuard)],
        },
        deleteOneBase: {
            decorators: [UseGuards(JwtAuthGuard)],
        }
    }
})
@Controller('users')
export class UsersController implements CrudController<User> {
    constructor(public service: UsersService) {}

    get base(): CrudController<User> {
        return this;
    }
    
    @ApiOperation({ summary: 'Login' })
    @ApiResponse({ status: 200, type: [AuthUsersDto] })
    @Post('login')
    async login(@Body() userDto: CreateUserDto): Promise<AuthUsersDto> {
        return this.service.login(userDto);
    }
}
