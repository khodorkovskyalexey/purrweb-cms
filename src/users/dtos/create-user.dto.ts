import { ApiProperty } from "@nestjs/swagger";
import { CrudValidationGroups } from "@nestjsx/crud";
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Auth0Service } from "src/auth0/auth0.service";
import { UpdateUserDto } from "./update-user.dto";

const { CREATE } = CrudValidationGroups;

export class CreateUserDto extends UpdateUserDto{
    @ApiProperty({ example: 'user@mail.ru', description: 'User email' })
    @IsNotEmpty({ groups: [CREATE] })
    @IsString({ always: true })
    @IsEmail({ always: true })
    email: string;

    @ApiProperty({ example: '123456', description: 'User id in Auth0 database' })
    @IsString({ always: true })
    sub: string;

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
        this.sub = model.sub;
        this.email = model.email;
        this.email_verified = model.email_verified;
        this.picture = model.picture;
    }

    static compare(model1: any, model2: any): Array<string> {
        const model1Dto = new CreateUserDto(model1);
        const model2Dto = new CreateUserDto(model2);

        let difference: Array<string> = [];
        Object.keys(model1Dto).forEach(key => { if(model1Dto[key] !== model2Dto[key]) difference.push(key) });
        
        return difference;
    }
}