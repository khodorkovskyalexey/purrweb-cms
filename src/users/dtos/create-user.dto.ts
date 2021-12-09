import { ApiProperty } from "@nestjs/swagger";
import { CrudValidationGroups } from "@nestjsx/crud";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { UpdateUserDto } from "./update-user.dto";

const { CREATE } = CrudValidationGroups;

export class CreateUserDto extends UpdateUserDto{
    @ApiProperty({ example: 'user@mail.ru', description: 'User email' })
    @IsNotEmpty({ groups: [CREATE] })
    @IsString({ always: true })
    @IsEmail({ always: true })
    email: string;

    constructor(model: any = {}) {
        super(model);
        this.email = model.email;
    }
}