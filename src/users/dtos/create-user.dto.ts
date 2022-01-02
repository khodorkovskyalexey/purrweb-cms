import { ApiProperty } from "@nestjs/swagger";
import { CrudValidationGroups } from "@nestjsx/crud";
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";
import { UpdateUserDto } from "./update-user.dto";

const { CREATE } = CrudValidationGroups;

export class CreateUserDto extends UpdateUserDto{
    @ApiProperty({ example: 'user@mail.ru', description: 'User email' })
    @IsNotEmpty({ groups: [CREATE] })
    @IsString({ always: true })
    @IsEmail({ always: true })
    email: string;

    @ApiProperty({ example: 'true', description: 'Email in verified' })
    @IsBoolean({ always: true })
    email_verified: boolean;

    @ApiProperty({
        example: 'https://s.gravatar.com/avatar/5658ffccee7f0ebfda2b226238b1eb6e?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fem.png',
        description: 'User avatar'
    })
    @IsString({ always: true })
    picture: string;

    constructor(model: any = {}) {
        super(model);
        this.email = model.email;
        this.email_verified = model.email_verified;
        this.picture = model.picture;
    }
}