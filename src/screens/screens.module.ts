import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth0Module } from 'src/auth0/auth0.module';
import { EventsModule } from 'src/events/events.module';
import { UsersModule } from 'src/users/users.module';
import { Screen } from './entities/Screen.entity';
import { ScreensController } from './screens.controller';
import { ScreensService } from './screens.service';

@Module({
    imports: [
      TypeOrmModule.forFeature([Screen]),
      EventsModule,
      UsersModule,
      Auth0Module
    ],
    controllers: [ScreensController],
    providers: [ScreensService],
    exports: [ScreensService]
  })
export class ScreensModule {}
