import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
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
    ],
    controllers: [OrdersController],
    providers: [OrdersService],
    exports: [OrdersService],
})
export class OrderModule {}