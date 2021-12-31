import { ApiProperty } from "@nestjs/swagger";
import { Order } from "src/orders/entities/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { File } from "../../files/entities/file.entity";

@Entity({ name: "content" })
export class Content {
    @ApiProperty({ example: '1', description: 'Content id' })
    @PrimaryGeneratedColumn()
    id: number;

    // @ApiProperty({ example: 'uploads\\file-1638106381562-a1.jpg', description: 'Url to file' })
    // @Column()
    // url: string;

    // @ApiProperty({ example: '.jpg', description: 'File extension' })
    // @Column()
    // extension: string;

    @ApiProperty({ example: '0', description: 'Duration of file' })
    @Column({ default: 0 })
    duration: number;

    @OneToMany(type => Order, orders => orders.content, { cascade: true })
    orders: Order[];

    @OneToMany(type => File, file => file.content, { cascade: true })
    files: File[];
}