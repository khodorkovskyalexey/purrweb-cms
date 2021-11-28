import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from 'src/events/events.module';
import { Screen } from './entities/Screen.entity';
import { ScreensController } from './screens.controller';
import { ScreensService } from './screens.service';

@Module({
    imports: [
      TypeOrmModule.forFeature([Screen]),
      EventsModule
    ],
    controllers: [ScreensController],
    providers: [ScreensService],
    exports: [ScreensService]
  })
export class ScreensModule {}
