import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Event } from "src/events/entities/event.entity";
import { EventsService } from "src/events/events.service";
import { AuthException } from "src/exceptions/auth.exception";
import { Screen } from "../entities/Screen.entity";
import { ScreensService } from "../screens.service";

@Injectable()
export class CheckOwnerGuard implements CanActivate {
    constructor(
        private screensService: ScreensService,
        private eventsService: EventsService
    ) {}

    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();

        try {
            const { screen_id } = req.params;
            const user_id: number = Number(req.user.id);
            if(screen_id) {
                const screen: Screen = await this.screensService.findOne(screen_id, { relations: ['event', 'event.user'] });
                
                if(!screen?.event || !screen?.event?.user) {
                    return true;
                }

                if(screen.event.user.id !== user_id) {
                    throw AuthException.Forbidden('User is not screen owner');
                }
            } else {
                const event_id = Number(req.body?.event?.id);
                if(!event_id) {
                    return true;
                }
                
                const event: Event = await this.eventsService.findOne(event_id, { relations: ['user'] });
                
                if(event.user && event.user.id !== user_id) {
                    throw AuthException.Forbidden('User is not screen owner');
                }
            }
            return true;   
        } catch (err) {
            throw AuthException.Forbidden(err.message);
        }
    }

}