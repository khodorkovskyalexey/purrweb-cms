import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @ApiProperty({ example: '1', description: 'User id' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'user@mail.ru', description: 'User email' })
    @Column({ nullable: false })
    email: string;

    @ApiProperty({ example: '$2a$10$Oz5ndu.h50cJldGyko5OiO2fTeOrKsJrVLKYHvPIan8F8pl/54n1y', description: 'Hash password' })
    @Column({ nullable: false})
    password: string;
}