import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
    constructor(
        @InjectRepository(User) repo: Repository<User>
    ) {
        super(repo);
    }

    async findByEmail(email: string, options = {}): Promise<User> {
        return await this.repo.findOne({ where: { email }, ...options });
    }
}
