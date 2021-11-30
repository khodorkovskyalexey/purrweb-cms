import { Controller, UseGuards } from "@nestjs/common";
import { Crud, CrudController } from "@nestjsx/crud";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
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
            decorators: [UseGuards(JwtAuthGuard, CheckPlaylistOwnerGuard)]
        },
        replaceOneBase: {
            decorators: [UseGuards(JwtAuthGuard, CheckPlaylistOwnerGuard)]
        },
        updateOneBase: {
            decorators: [UseGuards(JwtAuthGuard, CheckPlaylistOwnerGuard)]
        },
        deleteOneBase: {
            decorators: [UseGuards(JwtAuthGuard, CheckPlaylistOwnerGuard)],
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
@Controller('playlists')
export class PlaylistsController implements CrudController<Playlist> {
    constructor(public service: PlaylistsService) {}
}