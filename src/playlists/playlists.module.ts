import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Playlist } from "./entities/Playlist.entity";
import { PlaylistsController } from "./playlists.controller";
import { PlaylistsService } from "./playlists.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Playlist]),
    ],
    controllers: [PlaylistsController],
    providers: [PlaylistsService],
    exports: [],
})
export class PlaylistsModule {}