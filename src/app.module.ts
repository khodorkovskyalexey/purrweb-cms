import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { ScreensModule } from './screens/screens.module';
import { ContentsModule } from './contents/contents.module';
import { PlaylistsModule } from './playlists/playlists.module';
import { OrderModule } from './orders/orders.module';
import { FilesModule } from './files/files.module';
import { Auth0Module } from './auth0/auth0.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    EventsModule,
    ScreensModule,
    PlaylistsModule,
    OrderModule,
    ContentsModule,
    FilesModule,
    Auth0Module
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
