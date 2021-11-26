import { Controller, Post, UseGuards } from '@nestjs/common';
import { Crud, CrudController, CrudRequest, Override, ParsedBody } from '@nestjsx/crud';
import { AuthUsersDto } from './dtos/auth-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { HashPasswordGuard } from './guards/hash-password.guard';
import { UniqueEmailGuard } from './guards/unique-email.guard';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Crud({
    model: {
        type: User,
    },
    dto: {
        create: CreateUserDto,
    },
    routes: {
        exclude: ['createManyBase'],
        replaceOneBase: {
            decorators: [UseGuards(HashPasswordGuard)],
        },
        updateOneBase: {
            decorators: [UseGuards(HashPasswordGuard)],
        },
        createOneBase: {
            decorators: [UseGuards(UniqueEmailGuard, HashPasswordGuard)],
        }
    }
})
@Controller('users')
export class UsersController implements CrudController<User> {
    constructor(public service: UsersService) {}

    get base(): CrudController<User> {
        return this;
      }

    @Post('login')
    async login(@ParsedBody() userDto: CreateUserDto): Promise<AuthUsersDto> {
        return this.service.login(userDto);
    }
}
