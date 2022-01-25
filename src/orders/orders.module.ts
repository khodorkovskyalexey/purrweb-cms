import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Auth0Module } from "src/auth0/auth0.module";
import { EventsModule } from "src/events/events.module";
import { PlaylistsModule } from "src/playlists/playlists.module";
import { ScreensModule } from "src/screens/screens.module";
import { UsersModule } from "src/users/users.module";
import { Order } from "./entities/order.entity";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Order]),
        PlaylistsModule,
        ScreensModule,
        EventsModule,
        UsersModule,
        Auth0Module
    ],
    controllers: [OrdersController],
    providers: [OrdersService],
    exports: [OrdersService],
})
export class OrderModule {}