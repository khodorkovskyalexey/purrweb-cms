import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { CreateOrderDto } from "src/orders/dtos/create-order.dto";
import { Order } from "src/orders/entities/order.entity";
import { OrdersService } from "src/orders/orders.service";
import { Repository } from "typeorm";
import { ContentInBodyDto } from "./dto/content-in-body.dto";
import { CreateContentDto } from "./dto/create-content.dto";
import { Content } from "./entities/content.entity";

@Injectable()
export class ContentsService extends TypeOrmCrudService<Content> {
  constructor(
    @InjectRepository(Content) repo: Repository<Content>,
    private readonly ordersService: OrdersService
  ) {
    super(repo);
  }

  async create(fileDto: CreateContentDto): Promise<Content> {
    const createdFile = await this.repo.create(fileDto);
    await this.repo.save(createdFile);
    return createdFile;
  }
  
  async createArray(filesDto: Array<CreateContentDto>): Promise<Content[]> {
    return await Promise.all(filesDto.map(async file => await this.create(file)));
  }

  async setContent(playlist_id: string, content_id: string, orderDto: CreateOrderDto): Promise<Order> {
    const contentInBodyDto = new ContentInBodyDto({ ...orderDto, playlist_id, content_id });
    return await this.ordersService.create(contentInBodyDto);
  }
}