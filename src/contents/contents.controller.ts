import { Controller, UseInterceptors, UploadedFiles, Post, UploadedFile, Body, Param } from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { CreateFileDto } from 'src/files/dto/create-file.dto';
import { FilesService } from 'src/files/files.service';
import { CreateOrderDto } from 'src/orders/dtos/create-order.dto';
import { Order } from 'src/orders/entities/order.entity';
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
      files: {
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
    public readonly ordersService: OrdersService,
    public readonly filesService: FilesService
  ) {}
  
  @Override('createManyBase')
  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() contentData: ContentInBodyDto
  ) {
    const contentsDto: CreateContentDto = new CreateContentDto(contentData);
    const contentWithOrder = await this.service.createWithOrder(contentsDto, contentData);
    
    const filesDto: Array<CreateFileDto> = CreateFileDto.parseArrayFiles(files);
    const createdFiles = await Promise.all(
      filesDto.map(async file => await this.filesService.create(file, contentWithOrder.createdContent))
    );
    
    return { ...contentWithOrder.createdContent, order: contentWithOrder.createdOrder, files: createdFiles }
  }

  @Override('createOneBase')
  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() contentData: ContentInBodyDto
  ) {
    const contentsDto: CreateContentDto = new CreateContentDto(contentData);
    const contentWithOrder = await this.service.createWithOrder(contentsDto, contentData);

    const fileDto: CreateFileDto = CreateFileDto.parseFile(file);
    const createdFile = await this.filesService.create(fileDto, contentWithOrder.createdContent);

    return { ...contentWithOrder.createdContent, order: contentWithOrder.createdOrder, file: createdFile }
  }

  @ApiParam({ name: 'content_id', description: 'Content id', example: '1' })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Add file in playlist' })
  @Post(':content_id')
  @UseInterceptors(FileInterceptor('file'))
  async addFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('content_id') content_id: string
  ) {
    const content = await this.service.findById(content_id);
    const fileDto: CreateFileDto = CreateFileDto.parseFile(file);
    const createdFile = await this.filesService.create(fileDto, content);
    return { ...content, file: createdFile }
  }

  @ApiParam({ name: 'content_id', description: 'Content id', example: '1' })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Add file in playlist' })
  @Post(':content_id/bulk')
  @UseInterceptors(AnyFilesInterceptor())
  async addFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('content_id') content_id: string
  ) {
    const content = await this.service.findById(content_id);
    const filesDto: Array<CreateFileDto> = CreateFileDto.parseArrayFiles(files);
    const createdFiles = await Promise.all(
      filesDto.map(async file => await this.filesService.create(file, content))
    );
    return { ...content, files: createdFiles }
  }

  @ApiParam({ name: 'playlist_id', description: 'Playlist id', example: '1' })
  @ApiParam({ name: 'content_id', description: 'Content id', example: '1' })
  @ApiOperation({ summary: 'Set content in playlist' })
  @ApiResponse({ status: 200, type: Order })
  @Post(':content_id/playlists/:playlist_id')
  async setContent(
      @Body() orderDto: CreateOrderDto, 
      @Param('playlist_id') playlist_id: string, 
      @Param('content_id') content_id: string
  ): Promise<Order> {
      return this.service.setContent(playlist_id, content_id, orderDto);
  }
}
