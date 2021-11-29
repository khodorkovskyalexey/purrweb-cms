import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { ScreensModule } from './screens/screens.module';
import { ContentsModule } from './contents/contents.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    EventsModule,
    ScreensModule,
    ContentsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
