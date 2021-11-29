import { Module } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentsController } from './contents.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Content } from './entities/content.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Content]),
    MulterModule.register({ storage: diskStorage({
      destination: 'uploads',
      filename: (req, file, cb) => cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    })}),
  ],
  controllers: [ContentsController],
  providers: [ContentsService],
  exports: [ContentsService, MulterModule]
})
export class ContentsModule {}
