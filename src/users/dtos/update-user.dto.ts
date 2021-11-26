import { CrudValidationGroups } from "@nestjsx/crud";
import { IsNotEmpty, IsString } from "class-validator";

const { CREATE } = CrudValidationGroups;

export class UpdateUserDto {
    @IsNotEmpty({ groups: [CREATE] })
    @IsString({ always: true })
    password: string;

    constructor(model: any = {}) {
        this.password = model.password;
    }
}