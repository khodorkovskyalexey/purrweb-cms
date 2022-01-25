import { ApiProperty } from "@nestjs/swagger";
import { Screen } from "src/screens/entities/Screen.entity";
import { User } from "src/users/entities/users.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "event" })
export class Event {
    @ApiProperty({ example: '1', description: 'Event id' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'IT meet up', description: 'Event name' })
    @Column()
    name: string;

    @ManyToOne(type => User, user => user.events, { onDelete: 'CASCADE' })
    user: User;

    @OneToMany(type => Screen, screens => screens.event, { cascade: true })
    screens: Screen[];
}