import { CreateEventDto } from './create-event.dto';

export class UpdateEventDto extends CreateEventDto {
    constructor(model: any = {}) {
        super(model);
    }
}
