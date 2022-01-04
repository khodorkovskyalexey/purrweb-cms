import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Auth0Service } from 'src/auth0/auth0.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
    constructor(
        @InjectRepository(User) repo: Repository<User>,
        private readonly auth0Service: Auth0Service
    ) {
        super(repo);
    }

    async create(userDto: CreateUserDto) {
        const createdUser: User = await this.repo.create(userDto);
        await this.repo.save(createdUser);
        return createdUser;
    }

    async updateInAuth0(user_id: string | number, sub: string, userDto: UpdateUserDto) {
        await this.auth0Service.updateUser(sub, userDto);
        return await this.repo.update(user_id, userDto);
    }

    async deleteInAuth0(user_id: string | number, sub: string) {
        await this.auth0Service.deleteUser(sub);
        return await this.repo.delete(user_id);
    }

    async updateFromAuth0(user_id: string | number, userDto: CreateUserDto) {
        return await this.repo.update(user_id, userDto);
    }

    async findByEmail(email: string, options = {}): Promise<User> {
        return await this.repo.findOne({ where: { email }, ...options });
    }

    async findBySubId(sub_id: string, options = {}): Promise<User> {
        return await this.repo.findOne({ where: { sub_id }, ...options });
    }

    async getSubIdFromUserId(user_id: string | number) {
        const user = await this.repo.findOne({ where: { id: user_id }, select: ['sub_id'] });
        return user.sub_id;
    }

    checkRelevance(user1: CreateUserDto, user2: CreateUserDto): [boolean, Array<string>] {
        const difference = CreateUserDto.compare(user1, user2);        
        return [!difference.length, difference];
    }
}
