import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateFileDto {
    @ApiProperty({ description: 'Url to file' })
    fileBuffer: Buffer;

    @ApiProperty({ example: 'uploadfile.jpg', description: 'Url to file' })
    @IsString()
    fileName: string;

    @ApiProperty({ example: '.jpg', description: 'File extension' })
    @IsString()
    extension: string;

    constructor(model: any = {}) {
        this.fileBuffer = model.fileBuffer;
        this.fileName = model.fileName;
        this.extension = model.extension;
    }

    public static parseFile(file: Express.Multer.File): CreateFileDto {
        const model = {
            fileBuffer: file.buffer,
            fileName: file.originalname,
            extension: file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length),
        }
        return new CreateFileDto(model);
    }

    public static parseArrayFiles(files: Array<Express.Multer.File>): Array<CreateFileDto> {
        return files.map(file => this.parseFile(file));
    }
}