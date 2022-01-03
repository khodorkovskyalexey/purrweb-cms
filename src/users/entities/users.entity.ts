import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "src/events/entities/event.entity"

@Entity({ name: "user" })
export class User {
    @ApiProperty({ example: '1', description: 'User id' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: '123456', description: 'User id in Auth0 database' })
    @Column()
    sub_id: string;

    @ApiProperty({ example: 'user@mail.ru', description: 'User email' })
    @Column({ nullable: false })
    email: string;

    @ApiProperty({ example: 'true', description: 'Email in verified' })
    @Column()
    email_verified: boolean;

    @ApiProperty({
        example: 'https://s.gravatar.com/avatar/5658ffccee7f0ebfda2b226238b1eb6e?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fem.png',
        description: 'User avatar'
    })
    @Column()
    picture: string;

    @ApiProperty({ example: 'Aleksandr', description: 'User name' })
    @Column()
    name: string;

    @ApiProperty({ example: 'Aleksandr269', description: 'User nickname' })
    @Column()
    nickname: string;

    @OneToMany(type => Event, events => events.user, { cascade: true })
    events: Event[];
}