import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { CreateScreenDto } from "./create-screen.dto";

export class ScreenDto extends CreateScreenDto{
    @ApiProperty({ example: '1', description: 'Screen id' })
    @IsNumber()
    id: number;

    constructor(model: any = {}) {
        super(model);
        this.id = model.id;
    }
}