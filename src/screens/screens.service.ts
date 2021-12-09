import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Repository } from "typeorm";
import { Screen } from "./entities/Screen.entity";

@Injectable()
export class ScreensService extends TypeOrmCrudService<Screen> {
  constructor(@InjectRepository(Screen) repo: Repository<Screen>) {
    super(repo);
  }
}
