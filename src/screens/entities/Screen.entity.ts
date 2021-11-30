import { ApiProperty } from "@nestjs/swagger";
import { Event } from "src/events/entities/event.entity";
import { Playlist } from "src/playlists/entities/Playlist.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Screen {
    @ApiProperty({ example: '1', description: 'Screen id' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'Music screen', description: 'Screen name' })
    @Column()
    name: string;

    @ManyToOne(type => Event, event => event.screens, { onDelete: 'CASCADE' })
    event: Event;

    @OneToOne(type => Playlist, playlist => playlist.screen, { onDelete: 'CASCADE' })
    @JoinColumn()
    playlist: Playlist;
}