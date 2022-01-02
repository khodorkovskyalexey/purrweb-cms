import { Controller, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController, Override } from "@nestjsx/crud";
import { JwtAuth0Guard } from "src/guards/jwt-auth0.guard";
import { CreateScreenDto } from "./dtos/create-screen.dto";
import { UpdateScreenDto } from "./dtos/update-screen.dto";
import { Screen } from "./entities/Screen.entity";
import { CheckScreenOwnerGuard } from "./guards/check-screen-owner.guard";
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
      decorators: [UseGuards(JwtAuth0Guard, CheckScreenOwnerGuard)],
    },
    createManyBase: {
      decorators: [UseGuards(JwtAuth0Guard, CheckScreenOwnerGuard)],
    },
    deleteOneBase: {
      decorators: [UseGuards(JwtAuth0Guard, CheckScreenOwnerGuard)],
    },
    updateOneBase: {
      decorators: [UseGuards(JwtAuth0Guard, CheckScreenOwnerGuard)],
    },
    replaceOneBase: {
      decorators: [UseGuards(JwtAuth0Guard, CheckScreenOwnerGuard)],
    },
    recoverOneBase: {
      decorators: [UseGuards(JwtAuth0Guard, CheckScreenOwnerGuard)],
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
        eager: true,
      },
      playlist: {
        eager: true,
      },
    },
  },
})
@Controller('screens')
export class ScreensController implements CrudController<Screen> {
    constructor(public service: ScreensService) {}
}