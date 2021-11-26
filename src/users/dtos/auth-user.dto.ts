import { ApiProperty } from "@nestjs/swagger";
import { AuthTokensDto } from "./auth-tokens.dto"
import { UserDto } from "./user.dto";

export class AuthUsersDto extends UserDto {
    @ApiProperty({ description: 'Access jwt', type: AuthTokensDto })
    tokens: AuthTokensDto;

    constructor(user: UserDto, tokens: AuthTokensDto) {
        super(user)
        this.tokens = tokens
    }
}