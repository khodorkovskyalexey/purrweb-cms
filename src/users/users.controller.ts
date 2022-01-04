import { Body, Controller, Delete, Get, Param, Patch, Put, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, Override } from '@nestjsx/crud';
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

    @Override('updateOneBase')
    @ApiParam({ name: 'user_id', description: 'Updating user id', example: '1' })
    @ApiOperation({ summary: 'Update user' })
    @UseGuards(JwtAuth0Guard, VerificationUserGuard)
    @Patch(':user_id')
    async updateUser(@Param('user_id') id: string, @Body() user: UpdateUserDto) {
        const sub_id = await this.service.getSubIdFromUserId(id);
        return this.service.updateInAuth0(id, sub_id, user);
    }

    @Override('replaceOneBase')
    @ApiParam({ name: 'user_id', description: 'Replacing user id', example: '1' })
    @ApiOperation({ summary: 'Replace user' })
    @UseGuards(JwtAuth0Guard, VerificationUserGuard)
    @Put(':user_id')
    async replaceUser(@Param('user_id') id: string, @Body() user: UpdateUserDto) {
        return this.updateUser(id, user);
    }

    @Override('deleteOneBase')
    @ApiParam({ name: 'user_id', description: 'Deleting user id', example: '1' })
    @ApiOperation({ summary: 'Delete user' })
    @UseGuards(JwtAuth0Guard, VerificationUserGuard)
    @Delete(':user_id')
    async deleteUser(@Param('user_id') id: string) {
        const sub_id = await this.service.getSubIdFromUserId(id);
        return this.service.deleteInAuth0(id, sub_id);
    }
}
