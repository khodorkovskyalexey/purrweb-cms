import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { EventsService } from "src/events/events.service";
import { AuthException } from "src/exceptions/auth.exception";
import { CheckPlaylistOwnerGuard } from "src/playlists/guards/check-playlist-owner.guard";
import { PlaylistsService } from "src/playlists/playlists.service";
import { ScreensService } from "src/screens/screens.service";
import { Order } from "../entities/order.entity";
import { OrdersService } from "../orders.service";

@Injectable()
export class CheckOrdersOwnerGuard extends CheckPlaylistOwnerGuard implements CanActivate {
    constructor(
        protected ordersService: OrdersService,
        protected playlistsService: PlaylistsService,
        protected screensService: ScreensService,
        protected eventsService: EventsService,
    ) {
        super(playlistsService, screensService, eventsService);
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();

        try {
            const { order_id } = req.params;
            const order: Order = await this.ordersService.findOne(order_id, { relations: ['playlist'] });
            
            if(!order?.playlist) {
                return true;
            }

            req.body.playlist_id = order.playlist.id;
            return await super.canActivate(context);
        } catch (err) {
            throw AuthException.Forbidden(err.message);
        }
    }

}