import { Controller, UseInterceptors, UploadedFiles, Post, UploadedFile } from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { ContentsService } from './contents.service';
import { CreateContentDto } from './dto/create-content.dto';
import { Content } from './entities/content.entity';

@Crud({
  model: {
    type: Content,
  },
  dto: {
    create: CreateContentDto
  },
  routes: {
    exclude: ['replaceOneBase', 'updateOneBase']
  }
})
@Controller('contents')
export class ContentsController implements CrudController<Content> {
  constructor(public readonly service: ContentsService) {}

  @Override('createManyBase')
  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    const filesDto: Array<CreateContentDto> = CreateContentDto.parseArrayFiles(files);
    return this.service.createArray(filesDto);
  }

  @Override('createOneBase')
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileDto: CreateContentDto = CreateContentDto.parseFile(file);
    return this.service.create(fileDto);
  }
}
