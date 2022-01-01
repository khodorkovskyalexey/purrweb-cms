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

  async createWithOrder(contentDto: CreateContentDto, contentData: ContentInBodyDto) {
    const createdContent = await this.repo.create(contentDto);
    await this.repo.save(createdContent);

    contentData.content_id = createdContent.id;
    const createdOrder = await this.ordersService.create(contentData);

    return { createdContent, createdOrder };
  }

  async findById(content_id: string | number, options = {}): Promise<Content> {
    return await this.repo.findOne(content_id, options);
  }

  async delete(content_id: string | number) {
    return await this.repo.delete(content_id);
  }

  async setContent(playlist_id: string, content_id: string, orderDto: CreateOrderDto): Promise<Order> {
    const contentInBodyDto = new ContentInBodyDto({ ...orderDto, playlist_id, content_id });
    return await this.ordersService.create(contentInBodyDto);
  }
}