import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { CreatePlaylistDto } from "./create-playlist.dto";

export class PlaylistDto extends CreatePlaylistDto {
    @ApiProperty({ example: '1', description: 'Playlist id' })
    @IsNumber()
    id: number;

    constructor(model: any = {}) {
        super(model);
        this.id = model.id;
    }
}