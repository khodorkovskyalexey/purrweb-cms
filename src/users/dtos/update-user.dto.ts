import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateUserDto {
    @ApiProperty({ example: 'Aleksandr', description: 'User name' })
    @IsString({ always: true })
    name: string;

    @ApiProperty({ example: 'Aleksandr269', description: 'User nickname' })
    @IsString({ always: true })
    nickname: string;

    constructor(model: any = {}) {
        this.name = model.name;
        this.nickname = model.nickname;
    }
}