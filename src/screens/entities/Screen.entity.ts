import { ApiProperty } from "@nestjs/swagger";
import { Event } from "src/events/entities/event.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
}