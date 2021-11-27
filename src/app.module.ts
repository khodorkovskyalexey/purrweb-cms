import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    EventsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
