import { ApiProperty } from "@nestjs/swagger";
import { Screen } from "src/screens/entities/Screen.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Playlist {
    @ApiProperty({ example: '1', description: 'Playlist id' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'Pop music', description: 'Playlist name' })
    @Column()
    name: string;

    @OneToOne(type => Screen, screen => screen.playlist, { onDelete: 'CASCADE' })
    screen: Screen;
}