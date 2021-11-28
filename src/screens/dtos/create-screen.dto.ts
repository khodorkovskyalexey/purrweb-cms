import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateScreenDto {
    @ApiProperty({ example: 'Music screen', description: 'Screen name' })
    @IsString({ always: true })
    name: string;

    constructor(model: any = {}) {
        this.name = model.name;
    }
}