import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreatePlaylistDto {
    @ApiProperty({ example: 'Pop music', description: 'Playlist name' })
    @IsString({ always: true })
    name: string;

    constructor(model: any = {}) {
        this.name = model.name;
    }
}