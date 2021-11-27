import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Event {
    @ApiProperty({ example: '1', description: 'Event id' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'IT meet up', description: 'Event name' })
    @Column()
    name: string;

    @ManyToOne(type => User, user => user.events, { onDelete: 'CASCADE' })
    user: User;
}