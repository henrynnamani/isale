import { Module } from '@nestjs/common';
import { TelegramController } from './telegram.controller';
import { TelegramService } from './provider/telegram.service';
import { VendorsModule } from '../vendors/vendors.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [VendorsModule, CloudinaryModule],
  controllers: [TelegramController],
  providers: [TelegramService],
})
export class TelegramModule {}
