import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Repository } from "typeorm";
import { CreateContentDto } from "./dto/create-content.dto";
import { Content } from "./entities/content.entity";

@Injectable()
export class ContentsService extends TypeOrmCrudService<Content> {
  constructor(
    @InjectRepository(Content) repo: Repository<Content>) {
    super(repo);
  }

  async create(fileDto: CreateContentDto): Promise<Content> {
    const createdFile = await this.repo.create(fileDto);
    await this.repo.save(createdFile);
    return createdFile;
  }
  
  async createArray(filesDto: Array<CreateContentDto>): Promise<Content[]> {
    return await Promise.all(filesDto.map(async file => await this.create(file)));
  }
}