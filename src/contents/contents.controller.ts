import { Controller, UseInterceptors, UploadedFiles, Post, UploadedFile, Body } from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { OrdersService } from 'src/orders/orders.service';
import { ContentsService } from './contents.service';
import { ContentInBodyDto } from './dto/content-in-body.dto';
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
  },
  params: {
    content_id: {
        field: 'id',
        type: 'number',
        primary: true,
    }
  },
  query: {
    join: {
      orders: {
        eager: true,
      },
    }
  }
})
@ApiTags('Content module')
@Controller('contents')
export class ContentsController implements CrudController<Content> {
  constructor(
    public readonly service: ContentsService,
    public readonly ordersService: OrdersService
  ) {}
  
  @Override('createManyBase')
  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() contentData: ContentInBodyDto
  ) {
    const filesDto: Array<CreateContentDto> = CreateContentDto.parseArrayFiles(files);
    const createdContent = await this.service.createArray(filesDto);
    const content_ids = createdContent.map(content => content.id);
    const createdOrders = await this.ordersService.createArray(contentData, content_ids);
    
    return { createdContent, createdOrders }
  }

  @Override('createOneBase')
  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() contentData: ContentInBodyDto
  ) {
    const fileDto: CreateContentDto = CreateContentDto.parseFile(file);
    const createdContent = await this.service.create(fileDto);
    contentData.content_id = createdContent.id;
    const createdOrder = await this.ordersService.create(contentData);
    
    return { ...createdContent, order: createdOrder }
  }
}
