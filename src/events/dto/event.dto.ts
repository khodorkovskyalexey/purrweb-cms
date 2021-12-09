import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { CreateEventDto } from "./create-event.dto";

export class EventDto extends CreateEventDto {
    @ApiProperty({ example: '1', description: 'Event id' })
    @IsNumber()
    id: number;

    constructor(model: any = {}) {
        super(model);
        this.id = model.id;
    }
}