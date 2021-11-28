import { Body, Controller, Param, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController, Override } from "@nestjsx/crud";
import { CreateScreenDto } from "./dtos/create-screen.dto";
import { UpdateScreenDto } from "./dtos/update-screen.dto";
import { Screen } from "./entities/Screen.entity";
import { SetEventGuard } from "./guards/set-event.guard";
import { ScreensService } from "./screens.service";

@ApiTags('Screen module')
@Crud({
  model: {
    type: Screen,
  },
  params: {
    screen_id: {
        field: 'id',
        type: 'number',
        primary: true,
    },
    event_id: {
        field: 'event_id',
        type: 'number',
        // primary: true,
    },
  }
})
@Controller('events/:event_id/screens')
export class ScreensController implements CrudController<Screen> {
    constructor(public service: ScreensService) {}

    @Override('getManyBase')
    async checkBag(@Body() screenDto: CreateScreenDto, @Param() params: string[]) {
      console.log(params);
    }
}