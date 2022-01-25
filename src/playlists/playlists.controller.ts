import { Controller, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { JwtAuth0Guard } from "src/guards/jwt-auth0.guard";
import { CreatePlaylistDto } from "./dtos/create-playlist.dto";
import { UpdatePlaylistDto } from "./dtos/update-playlist.dto";
import { Playlist } from "./entities/Playlist.entity";
import { CheckPlaylistOwnerGuard } from './guards/check-playlist-owner.guard'
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
    routes: {
        exclude: ['createManyBase'],
        createOneBase: {
            decorators: [UseGuards(JwtAuth0Guard, CheckPlaylistOwnerGuard)]
        },
        replaceOneBase: {
            decorators: [UseGuards(JwtAuth0Guard, CheckPlaylistOwnerGuard)]
        },
        updateOneBase: {
            decorators: [UseGuards(JwtAuth0Guard, CheckPlaylistOwnerGuard)]
        },
        deleteOneBase: {
            decorators: [UseGuards(JwtAuth0Guard, CheckPlaylistOwnerGuard)],
        },
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
@ApiTags('Playlist module')
@Controller('playlists')
export class PlaylistsController implements CrudController<Playlist> {
    constructor(public service: PlaylistsService) {}
}