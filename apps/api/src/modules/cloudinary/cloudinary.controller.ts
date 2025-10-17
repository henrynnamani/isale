import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CloudinaryService } from './provider/cloudinary.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import multer from 'multer';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: multer.memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  async uploadImage(@UploadedFiles() files: Express.Multer.File[]) {
    const urls = await this.cloudinaryService.uploadMultipleToCloudinary(files);
    return { data: urls };
  }
}
