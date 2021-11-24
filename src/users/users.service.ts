import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { AuthUsersDto } from './dtos/auth-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './users.entity';
import * as bcrypt from 'bcryptjs';
import { AuthException } from 'src/exceptions/auth.exception';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
    constructor(
        @InjectRepository(User) repo: Repository<User>,
        private readonly authService: AuthService
    ) {
        super(repo);
    }

    async login(userDto: CreateUserDto): Promise<AuthUsersDto> {
        const user = await this.repo.findOne({ where: { email: userDto.email } });
        const isPasswordEquals = await bcrypt.compare(userDto.password, user.password);
        if(user && isPasswordEquals) {
            return this.authService.generateResponse(user);
        }
        throw AuthException.UnauthorizedError();
    }

    async register(userDto: CreateUserDto): Promise<AuthUsersDto> {
        const candidate = await this.repo.findOne({ where: { email: userDto.email } });
        if(candidate) {
            throw AuthException.BadRequest(`User with email: ${userDto.email} already exists`);
        }

        const user = await this.repo.create(userDto);
        await this.repo.save(user);
        
        return this.authService.generateResponse(user);
    }
}
