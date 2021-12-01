import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { CreateOrderDto } from "src/orders/dtos/create-order.dto";

export class ContentInBodyDto extends CreateOrderDto {
    @ApiProperty({ example: '1', description: 'Playlist id' })
    @IsOptional()
    @IsNumber()
    playlist_id: number;

    @ApiProperty({ example: '1', description: 'Content id' })
    @IsOptional()
    @IsNumber()
    content_id: number;

    constructor(model: any = {}) {
        super(model);
        this.playlist_id = model.playlist_id;
        this.content_id = model.content_id;
    }
}