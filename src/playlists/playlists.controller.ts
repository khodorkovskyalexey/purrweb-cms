import { Controller } from "@nestjs/common";
import { Crud, CrudController } from "@nestjsx/crud";
import { Playlist } from "./entities/Playlist.entity";
import { PlaylistsService } from "./playlists.service";

@Crud({
    model: {
        type: Playlist,
    },
})
@Controller('playlists')
export class PlaylistsController implements CrudController<Playlist> {
    constructor(public service: PlaylistsService) {}
}