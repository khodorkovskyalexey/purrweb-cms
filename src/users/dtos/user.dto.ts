import { IsNumber } from "class-validator";
import { CreateUserDto } from "./create-user.dto";

export class UserDto extends CreateUserDto {
    @IsNumber()
    id: number;

    constructor(model: any = {}) {
        super(model);
        this.id = model.id;
    }
}