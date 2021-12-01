import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Repository } from "typeorm";
import { CreateOrderDto } from "./dtos/create-order.dto";
import { Order } from "./entities/order.entity";

@Injectable()
export class OrdersService extends TypeOrmCrudService<Order> {
  constructor(@InjectRepository(Order) repo: Repository<Order>) {
    super(repo);
  }

//   async create(orderDto: CreateOrderDto): Promise<Order> {
//     const createdOrder = await this.repo.create(orderDto);
//     await this.repo.save(createdOrder);
//     return createdOrder;
//   }

//   async createArray(ordersDto: Array<CreateOrderDto>): Promise<Order[]> {
//     return await Promise.all(ordersDto.map(async order => await this.create(order)));
//   }
}