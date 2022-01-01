import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Content } from "src/contents/entities/content.entity";
import { Repository } from "typeorm";
import { CreateFileDto } from "./dto/create-file.dto";
import { File } from "./entities/file.entity";
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FilesService extends TypeOrmCrudService<File> {
  constructor(
    @InjectRepository(File) repo: Repository<File>
  ) {
    super(repo);
  }

  async create(file: CreateFileDto, content: Content): Promise<File> {
    const s3 = new S3();
    const uploadResult = await s3.upload({
      Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
      Body: file.fileBuffer,
      Key: `${uuid()}-${file.fileName}`
    }).promise();

    const createdFile: File = await this.repo.create({
      url: uploadResult.Location,
      key: uploadResult.Key,
      extension: file.extension,
      content: { id: content.id }
    });
    await this.repo.save(createdFile);
    return createdFile;
  }

  async createArray(filesDto: Array<CreateFileDto>, content: Content): Promise<File[]> {
    return await Promise.all(filesDto.map(async file => await this.create(file, content)));
  }
}