import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
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
      decorators: [UseGuards(JwtAuthGuard, SetUserGuard)]
    },
    createManyBase: {
      decorators: [UseGuards(JwtAuthGuard, SetUserGuard)]
    },
    deleteOneBase: {
      decorators: [UseGuards(JwtAuthGuard, CheckEventOwnerGuard)]
    },
    recoverOneBase: {
      decorators: [UseGuards(JwtAuthGuard, CheckEventOwnerGuard)]
    },
    updateOneBase: {
      decorators: [UseGuards(JwtAuthGuard, CheckEventOwnerGuard)]
    },
    replaceOneBase: {
      decorators: [UseGuards(JwtAuthGuard, CheckEventOwnerGuard)]
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
