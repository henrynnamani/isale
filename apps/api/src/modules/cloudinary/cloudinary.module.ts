import { Module } from '@nestjs/common';
import { CloudinaryService } from './provider/cloudinary.service';
import { CloudinaryController } from './cloudinary.controller';

@Module({
  providers: [CloudinaryService],
  exports: [CloudinaryService],
  controllers: [CloudinaryController],
})
export class CloudinaryModule {}
