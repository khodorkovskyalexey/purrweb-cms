import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { JwtAuth0Guard } from 'src/guards/jwt-auth0.guard';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { EventsService } from './events.service';
import { CheckEventOwnerGuard } from './guards/check-event-owner.guard';
import { SetUserGuard } from './guards/set-user.guard';

@ApiTags('Event module')
@Crud({
  model: {
    type: Event,
  },
  dto: {
    create: CreateEventDto,
    replace: UpdateEventDto,
    update: UpdateEventDto,
  },
  routes: {
    createOneBase: {
      decorators: [UseGuards(JwtAuth0Guard, SetUserGuard)]
    },
    createManyBase: {
      decorators: [UseGuards(JwtAuth0Guard, SetUserGuard)]
    },
    deleteOneBase: {
      decorators: [UseGuards(JwtAuth0Guard, CheckEventOwnerGuard)]
    },
    recoverOneBase: {
      decorators: [UseGuards(JwtAuth0Guard, CheckEventOwnerGuard)]
    },
    updateOneBase: {
      decorators: [UseGuards(JwtAuth0Guard, CheckEventOwnerGuard)]
    },
    replaceOneBase: {
      decorators: [UseGuards(JwtAuth0Guard, CheckEventOwnerGuard)]
    },
  },
  params: {
    event_id: {
        field: 'id',
        type: 'number',
        primary: true,
    }
  },
  query: {
    join: {
      user: {
        eager: true
      },
      screens: {
        eager: true
      },
    }
  }
})
@Controller('events')
export class EventsController implements CrudController<Event> {
  constructor(public service: EventsService) {}
}
