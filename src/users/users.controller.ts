import { Controller, Post } from '@nestjs/common';
import { Crud, CrudController, CrudRequest, Override, ParsedBody } from '@nestjsx/crud';
import { AuthUsersDto } from './dtos/auth-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Crud({
    model: {
        type: User,
    },
    dto: {
        create: CreateUserDto,
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

    @Override('createOneBase')
    async register(@ParsedBody() userDto: CreateUserDto): Promise<AuthUsersDto> {
        return this.service.register(userDto);
    }
}
