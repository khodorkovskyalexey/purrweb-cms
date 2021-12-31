import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { ContentInBodyDto } from "src/contents/dto/content-in-body.dto";
import { Repository } from "typeorm";
import { Order } from "./entities/order.entity";

@Injectable()
export class OrdersService extends TypeOrmCrudService<Order> {
  constructor(@InjectRepository(Order) repo: Repository<Order>) {
    super(repo);
  }

  async create(orderDto: ContentInBodyDto): Promise<Order> {
    const createdOrder = await this.repo.create({ ...orderDto, playlist: { id: orderDto.playlist_id }, content: { id: orderDto.content_id } });
    await this.repo.save(createdOrder);
    return createdOrder;
  }
}