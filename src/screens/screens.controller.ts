import { Controller, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController, Override } from "@nestjsx/crud";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { CreateScreenDto } from "./dtos/create-screen.dto";
import { UpdateScreenDto } from "./dtos/update-screen.dto";
import { Screen } from "./entities/Screen.entity";
import { CheckOwnerGuard } from "./guards/check-owner.guard";
import { ScreensService } from "./screens.service";

@ApiTags('Screen module')
@Crud({
  model: {
    type: Screen,
  },
  dto: {
    create: CreateScreenDto,
    replace: UpdateScreenDto,
    update: UpdateScreenDto,
  },
  routes: {
    createOneBase: {
      decorators: [UseGuards(JwtAuthGuard, CheckOwnerGuard)],
    },
    createManyBase: {
      decorators: [UseGuards(JwtAuthGuard, CheckOwnerGuard)],
    },
    deleteOneBase: {
      decorators: [UseGuards(JwtAuthGuard, CheckOwnerGuard)],
    },
    updateOneBase: {
      decorators: [UseGuards(JwtAuthGuard, CheckOwnerGuard)],
    },
    replaceOneBase: {
      decorators: [UseGuards(JwtAuthGuard, CheckOwnerGuard)],
    },
    recoverOneBase: {
      decorators: [UseGuards(JwtAuthGuard, CheckOwnerGuard)],
    },
  },
  params: {
    screen_id: {
        field: 'id',
        type: 'number',
        primary: true,
    },
  },
  query: {
    join: {
      event: {
        eager: true
      },
    }
  }
})
@Controller('screens')
export class ScreensController implements CrudController<Screen> {
    constructor(public service: ScreensService) {}
}