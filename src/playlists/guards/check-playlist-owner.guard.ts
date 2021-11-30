import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { EventsService } from "src/events/events.service";
import { AuthException } from "src/exceptions/auth.exception";
import { CheckScreenOwnerGuard } from "src/screens/guards/check-screen-owner.guard";
import { ScreensService } from "src/screens/screens.service";
import { Playlist } from "../entities/Playlist.entity";
import { PlaylistsService } from "../playlists.service";

@Injectable()
export class CheckPlaylistOwnerGuard extends CheckScreenOwnerGuard implements CanActivate {
    constructor(
        protected playlistsService: PlaylistsService,
        protected screensService: ScreensService,
        protected eventsService: EventsService,
    ) {
        super(screensService, eventsService);
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();

        try {
            const { playlist_id } = req.params;
            
            if(playlist_id) {
                const playlist: Playlist = await this.playlistsService.findOne(playlist_id, { relations: ['screen'] });
                
                if(!playlist?.screen) {
                    return true;
                }

                req.body.screen_id = playlist.screen.id;
                return await super.canActivate(context);
            } else {
                const screen_id = Number(req.body?.screen?.id);
        
                if(!screen_id) {
                    return true;
                }

                req.body.screen_id = screen_id;                
                return await super.canActivate(context);
            }
        } catch (err) {
            throw AuthException.Forbidden(err.message);
        }
    }

}