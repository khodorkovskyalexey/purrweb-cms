import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthException } from "src/exceptions/auth.exception";
import { Event } from "../entities/event.entity";
import { EventsService } from "../events.service";

@Injectable()
export class CheckOwnerGuard implements CanActivate {
    constructor(private eventsService: EventsService) {}

    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();

        try {
            const event: Event = await this.eventsService.findOne(req.params?.event_id, { relations: ['user'] });
            const owner_id: number = Number(event.user.id);

            if(req.user?.id !== owner_id) {
                throw AuthException.Forbidden('User is not event owner');
            }

            return true;   
        } catch (err) {
            throw AuthException.Forbidden(err.message);
        }
    }

}