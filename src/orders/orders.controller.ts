import { Controller } from "@nestjs/common";
import { Crud, CrudController } from "@nestjsx/crud";
import { CreateOrderDto } from "./dtos/create-order.dto";
import { UpdateOrderDto } from "./dtos/update-order.dto";
import { Order } from "./entities/order.entity";
import { OrdersService } from "./orders.service";

@Crud({
    model: {
        type: Order,
    },
    dto: {
        create: CreateOrderDto,
        update: UpdateOrderDto,
        replace: UpdateOrderDto,
    },
    routes: {
        // exclude: ['createOneBase', 'createManyBase'],
    },
    params: {
        order_id: {
            field: 'id',
            type: 'number',
            primary: true,
        },
    },
    query: {
        join: {
            playlist: {
              eager: true,
            },
            content: {
              eager: true,
            },
        },
    },
})
@Controller('orders')
export class OrdersController implements CrudController<Order> {
    constructor(public service: OrdersService) {}
}