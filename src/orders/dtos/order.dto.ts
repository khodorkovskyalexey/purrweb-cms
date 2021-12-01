import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { CreateOrderDto } from "./create-order.dto";

export class OrderDto extends CreateOrderDto {
    @ApiProperty({ example: '1', description: 'Order id' })
    @IsNumber()
    id: number;

    constructor(model: any = {}) {
        super(model);
        this.id = model.id;
    }
}