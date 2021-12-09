import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Repository } from "typeorm";
import { Playlist } from "./entities/Playlist.entity";

@Injectable()
export class PlaylistsService extends TypeOrmCrudService<Playlist> {
  constructor(@InjectRepository(Playlist) repo: Repository<Playlist>) {
    super(repo);
  }
}