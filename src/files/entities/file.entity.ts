import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Content } from "../../contents/entities/content.entity";

@Entity({ name: "file" })
export class File {
    @ApiProperty({ example: '1', description: 'File id' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'uploads\\file-1638106381562-a1.jpg', description: 'Url to file' })
    @Column()
    url: string;

    @ApiProperty({ example: '.jpg', description: 'File extension' })
    @Column()
    extension: string;

    @ManyToOne(type => Content, content => content.files, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'contentid' })
    content: Content;
}