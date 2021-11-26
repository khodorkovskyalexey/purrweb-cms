import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { AuthUsersDto } from './dtos/auth-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/users.entity';
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

    async findByEmail(email: string): Promise<User> {
        return await this.repo.findOne({ where: { email } });
    }

    async login(reqUserDto: CreateUserDto): Promise<AuthUsersDto> {
        const user = await this.findByEmail(reqUserDto.email);
        const isPasswordEquals = await bcrypt.compare(reqUserDto.password, user.password);
        if(user && isPasswordEquals) {
            return this.authService.generateResponse(user);
        }
        throw AuthException.UnauthorizedError();
    }
}
