import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Content } from "../../contents/entities/content.entity";

@Entity({ name: "file" })
export class File {
    @ApiProperty({ example: '1', description: 'File id' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'https://cms-screen-bucket.s3.ap-northeast-1.amazonaws.com/c4d09436-7e5e-428e-a5b5-510c8c4ca63e-uploadfile.jpg', description: 'Url to file' })
    @Column()
    url: string;

    @ApiProperty({ example: '.jpg', description: 'File extension' })
    @Column()
    extension: string;

    @ApiProperty({ example: 'c4d09436-7e5e-428e-a5b5-510c8c4ca63e-uploadfile.jpg', description: 'File key in aws s3' })
    @Column()
    key: string;

    @ManyToOne(type => Content, content => content.files, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'contentid' })
    content: Content;
}