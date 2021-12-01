import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class CreateOrderDto {
    @ApiProperty({ example: '1', description: 'Order in playlist' })
    @IsNumber()
    order: number;

    @ApiProperty({ example: '34', description: 'New content duration (in sec)' })
    @IsOptional()
    @IsNumber()
    change_duration: number;

    constructor(model: any = {}) {
        this.order = model.order;
        this.change_duration = model.change_duration;
    }
}