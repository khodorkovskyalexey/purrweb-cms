import { Controller, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { JwtAuth0Guard } from "src/guards/jwt-auth0.guard";
import { CreateOrderDto } from "./dtos/create-order.dto";
import { UpdateOrderDto } from "./dtos/update-order.dto";
import { Order } from "./entities/order.entity";
import { CheckOrdersOwnerGuard } from "./guards/check-order-owner.guard";
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
        exclude: ['createOneBase', 'createManyBase'],
        updateOneBase: {
            decorators: [UseGuards(JwtAuth0Guard, CheckOrdersOwnerGuard)],
        },
        replaceOneBase: {
            decorators: [UseGuards(JwtAuth0Guard, CheckOrdersOwnerGuard)],
        },
        deleteOneBase: {
            decorators: [UseGuards(JwtAuth0Guard, CheckOrdersOwnerGuard)],
        },
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
@ApiTags('Order module')
@Controller('orders')
export class OrdersController implements CrudController<Order> {
    constructor(public service: OrdersService) {}
}