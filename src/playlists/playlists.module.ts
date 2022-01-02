import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Auth0Module } from "src/auth0/auth0.module";
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
        UsersModule,
        Auth0Module
    ],
    controllers: [PlaylistsController],
    providers: [PlaylistsService],
    exports: [PlaylistsService],
})
export class PlaylistsModule {}