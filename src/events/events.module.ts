import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { UsersModule } from 'src/users/users.module';
import { Auth0Module } from 'src/auth0/auth0.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    UsersModule,
    Auth0Module
  ],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService]
})
export class EventsModule {}
