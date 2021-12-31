import { ApiProperty } from "@nestjs/swagger";
// import { IsString } from "class-validator";

export class CreateContentDto {
    // @ApiProperty({ example: 'uploads\\file-1638106381562-a1.jpg', description: 'Url to file' })
    // @IsString()
    // url: string;

    // @ApiProperty({ example: '.jpg', description: 'File extension' })
    // @IsString()
    // extension: string;

    @ApiProperty({ example: '15', description: 'Duration of file' })
    duration: number;

    constructor(model: any = {}) {
        // this.extension = model.extension;
        // this.url = model.url;
        this.duration = model.duration;
    }
}