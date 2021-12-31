import { ApiProperty } from "@nestjs/swagger";

export class CreateContentDto {
    @ApiProperty({ example: '15', description: 'Duration of file' })
    duration: number;

    constructor(model: any = {}) {
        this.duration = model.duration;
    }
}