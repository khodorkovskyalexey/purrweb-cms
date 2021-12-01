import { ApiProperty } from "@nestjs/swagger";
import { Content } from "src/contents/entities/content.entity";
import { Playlist } from "src/playlists/entities/Playlist.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
    @ApiProperty({ example: '1', description: 'Order id' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: '1', description: 'Order in playlist' })
    @Column()
    order: number;

    @ApiProperty({ example: '34', description: 'New content duration (in sec)' })
    @Column({ nullable: true })
    change_duration: number;

    @ManyToOne(type => Playlist, playlist => playlist.orders, { onDelete: 'CASCADE' })
    playlist: Playlist;

    @ManyToOne(type => Content, content => content.orders, { onDelete: 'CASCADE' })
    content: Content;
}