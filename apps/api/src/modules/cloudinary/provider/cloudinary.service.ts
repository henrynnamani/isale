import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import axios from 'axios';
import axiosRetry from 'axios-retry';

@Injectable()
export class CloudinaryService implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    cloudinary.config({
      cloud_name: this.configService.get<string>('cloudinary.cloud_name'),
      api_key: this.configService.get<string>('cloudinary.apiKey'),
      api_secret: this.configService.get<string>('cloudinary.apiSecret'),
    });

    axiosRetry(axios, { retries: 3 });
  }

  async uploadVendorImageToCloudinary(filePath: string) {
    const botToken = this.configService.get<string>('telegram.botToken');
    const telegramFileUrl = `https://api.telegram.org/file/bot${botToken}/${filePath}`;

    const response = await axios.get(telegramFileUrl, {
      responseType: 'stream',
      timeout: 20000,
    });

    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'vendor_logo',
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        },
      );

      response.data.pipe(stream);
    });
  }
}
