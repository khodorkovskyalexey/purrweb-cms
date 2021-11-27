import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { EventsService } from './events.service';
import { CheckOwnerGuard } from './guards/check-owner.guard';
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
      decorators: [UseGuards(JwtAuthGuard, CheckOwnerGuard)]
    },
    recoverOneBase: {
      decorators: [UseGuards(JwtAuthGuard, CheckOwnerGuard)]
    },
    updateOneBase: {
      decorators: [UseGuards(JwtAuthGuard, CheckOwnerGuard)]
    },
    replaceOneBase: {
      decorators: [UseGuards(JwtAuthGuard, CheckOwnerGuard)]
    },
  },
  params: {
    event_id: {
        field: 'id',
        type: 'number',
        primary: true,
    },
  },
  query: {
    join: {
      user: {
        eager: true
      }
    }
  }
})
@Controller('events')
export class EventsController implements CrudController<Event> {
  constructor(public service: EventsService) {}
}
