import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateContentDto {
    @ApiProperty({ example: 'uploads\\file-1638106381562-a1.jpg', description: 'Url to file' })
    @IsString()
    url: string;

    @ApiProperty({ example: '.jpg', description: 'File extension' })
    @IsString()
    extension: string;

    @ApiProperty({ example: '15', description: 'Duration of file' })
    duration: number;

    constructor(model: any = {}) {
        this.url = model.url;
        this.extension = model.extension;
        this.duration = model.duration;
    }

    public static parseFile(file: Express.Multer.File): CreateContentDto {
        const model = {
            url: file.path,
            extension: file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length),
            duration: 0,
        }
        return new CreateContentDto(model);
    }

    public static parseArrayFiles(files: Array<Express.Multer.File>): Array<CreateContentDto> {
        return files.map(file => this.parseFile(file));
    }
}