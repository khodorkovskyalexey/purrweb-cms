import { ApiProperty } from "@nestjs/swagger"
import { IsJWT } from "class-validator"

export class AuthTokensDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQG1haWwucnUiLCJpYXQiOjE2Mz',
    description: 'Access jwt'
  })
  @IsJWT()
  readonly accessToken: string
}