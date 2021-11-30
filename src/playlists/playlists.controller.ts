import { Controller } from "@nestjs/common";
import { Crud, CrudController } from "@nestjsx/crud";
import { CreatePlaylistDto } from "./dtos/create-playlist.dto";
import { UpdatePlaylistDto } from "./dtos/update-playlist.dto";
import { Playlist } from "./entities/Playlist.entity";
import { PlaylistsService } from "./playlists.service";

@Crud({
    model: {
        type: Playlist,
    },
    dto: {
        create: CreatePlaylistDto,
        update: UpdatePlaylistDto,
        replace: UpdatePlaylistDto,
    },
    params: {
        playlist_id: {
            field: 'id',
            type: 'number',
            primary: true,
        },
    },
    query: {
        join: {
          screen: {
            eager: true,
          },
        },
    },
})
@Controller('playlists')
export class PlaylistsController implements CrudController<Playlist> {
    constructor(public service: PlaylistsService) {}
}