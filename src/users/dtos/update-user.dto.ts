import { ApiProperty } from "@nestjs/swagger";
import { CrudValidationGroups } from "@nestjsx/crud";
import { IsNotEmpty, IsString } from "class-validator";

const { CREATE } = CrudValidationGroups;

export class UpdateUserDto {
    @ApiProperty({ example: 'password123', description: 'User password' })
    @IsNotEmpty({ groups: [CREATE] })
    @IsString({ always: true })
    password: string;

    constructor(model: any = {}) {
        this.password = model.password;
    }
}