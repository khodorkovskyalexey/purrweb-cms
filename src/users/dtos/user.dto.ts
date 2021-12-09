import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { CreateUserDto } from "./create-user.dto";

export class UserDto extends CreateUserDto {
    @ApiProperty({ example: '1', description: 'User id' })
    @IsNumber()
    id: number;

    constructor(model: any = {}) {
        super(model);
        this.id = model.id;
    }
}