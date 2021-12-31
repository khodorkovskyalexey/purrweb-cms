import { ApiProperty } from "@nestjs/swagger";
import { Order } from "src/orders/entities/order.entity";
import { Screen } from "src/screens/entities/Screen.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "playlist" })
export class Playlist {
    @ApiProperty({ example: '1', description: 'Playlist id' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'Pop music', description: 'Playlist name' })
    @Column()
    name: string;

    @OneToOne(type => Screen, screen => screen.playlist, { onDelete: 'CASCADE' })
    screen: Screen;

    @OneToMany(type => Order, orders => orders.playlist, { cascade: true })
    orders: Order[];
}