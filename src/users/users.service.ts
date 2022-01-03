import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
    constructor(
        @InjectRepository(User) repo: Repository<User>
    ) {
        super(repo);
    }

    async create(userDto: CreateUserDto) {
        const createdUser: User = await this.repo.create(userDto);
        await this.repo.save(createdUser);
        return createdUser;
    }

    async findByEmail(email: string, options = {}): Promise<User> {
        return await this.repo.findOne({ where: { email }, ...options });
    }

    async findBySubId(sub_id: string, options = {}): Promise<User> {
        return await this.repo.findOne({ where: { sub_id }, ...options });
    }
}
