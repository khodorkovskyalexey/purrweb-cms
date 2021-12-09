import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventsModule } from "src/events/events.module";
import { ScreensModule } from "src/screens/screens.module";
import { UsersModule } from "src/users/users.module";
import { Playlist } from "./entities/Playlist.entity";
import { PlaylistsController } from "./playlists.controller";
import { PlaylistsService } from "./playlists.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Playlist]),
        ScreensModule,
        EventsModule,
        UsersModule
    ],
    controllers: [PlaylistsController],
    providers: [PlaylistsService],
    exports: [PlaylistsService],
})
export class PlaylistsModule {}