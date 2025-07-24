import { Module } from '@nestjs/common';
import { CloudinaryService } from './provider/cloudinary.service';

@Module({
  providers: [CloudinaryService],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
