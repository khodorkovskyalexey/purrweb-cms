import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Content } from "src/contents/entities/content.entity";
import { Repository } from "typeorm";
import { CreateFileDto } from "./dto/create-file.dto";
import { File } from "./entities/file.entity";

@Injectable()
export class FilesService extends TypeOrmCrudService<File> {
  constructor(
    @InjectRepository(File) repo: Repository<File>
  ) {
    super(repo);
  }

  async create(fileDto: CreateFileDto, content: Content): Promise<File> {
    const createdFile: File = await this.repo.create({ ...fileDto, content: { id: content.id } });
    await this.repo.save(createdFile);
    return createdFile;
  }

  async createArray(filesDto: Array<CreateFileDto>, content: Content): Promise<File[]> {
    return await Promise.all(filesDto.map(async file => await this.create(file, content)));
  }
}