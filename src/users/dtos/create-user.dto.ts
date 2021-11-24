import { CrudValidationGroups } from "@nestjsx/crud";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

const { CREATE, UPDATE } = CrudValidationGroups;

export class CreateUserDto {
    @IsNotEmpty({ groups: [CREATE] })
    @IsString({ always: true })
    @IsEmail({ always: true })
    email: string;

    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @IsString({ always: true })
    password: string;

    constructor(model: any = {}) {
        this.email = model.email;
        this.password = model.password;
    }
}