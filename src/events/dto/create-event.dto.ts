import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateEventDto {
    @ApiProperty({ example: 'IT meet up', description: 'Event name' })
    @IsString({ always: true })
    name: string;

    constructor(model: any = {}) {
        this.name = model.name;
    }
}