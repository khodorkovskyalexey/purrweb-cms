import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Column } from "typeorm";

export class CreateFileDto {
    @ApiProperty({ example: 'uploads\\file-1638106381562-a1.jpg', description: 'Url to file' })
    @IsString()
    url: string;

    @ApiProperty({ example: '.jpg', description: 'File extension' })
    @Column()
    extension: string;

    constructor(model: any = {}) {
        this.url = model.url;
        this.extension = model.extension;
    }

    public static parseFile(file: Express.Multer.File): CreateFileDto {
        const model = {
            url: file.path,
            extension: file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length),
        }
        return new CreateFileDto(model);
    }

    public static parseArrayFiles(files: Array<Express.Multer.File>): Array<CreateFileDto> {
        return files.map(file => this.parseFile(file));
    }
}