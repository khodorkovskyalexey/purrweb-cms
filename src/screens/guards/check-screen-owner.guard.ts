import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { EventsService } from "src/events/events.service";
import { CheckEventOwnerGuard } from "src/events/guards/check-event-owner.guard";
import { AuthException } from "src/exceptions/auth.exception";
import { Screen } from "../entities/Screen.entity";
import { ScreensService } from "../screens.service";

@Injectable()
export class CheckScreenOwnerGuard extends CheckEventOwnerGuard implements CanActivate {
    constructor(
        protected screensService: ScreensService,
        protected eventsService: EventsService
    ) {
        super(eventsService);
    }

    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        try {
            const screen_id = req.params?.screen_id || req.body?.screen_id;
            if(screen_id) {
                const screen: Screen = await this.screensService.findOne(screen_id, { relations: ['event'] });
                if(!screen?.event) {
                    return true;
                }

                req.body.event_id = screen.event.id;
                return await super.canActivate(context);
            } else {
                const event_id = Number(req.body?.event?.id);
                
                if(!event_id) {
                    return true;
                }

                req.body.event_id = event_id;                
                return await super.canActivate(context);
            }
        } catch (err) {
            throw AuthException.Forbidden(err.message);
        }
    }

}