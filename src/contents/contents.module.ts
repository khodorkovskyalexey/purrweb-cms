import { Module } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentsController } from './contents.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage, memoryStorage } from 'multer';
import { Content } from './entities/content.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from 'src/orders/orders.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Content]),
    MulterModule.register({ storage: memoryStorage() }),
    OrderModule,
    FilesModule
  ],
  controllers: [ContentsController],
  providers: [ContentsService],
  exports: [ContentsService, MulterModule]
})
export class ContentsModule {}
