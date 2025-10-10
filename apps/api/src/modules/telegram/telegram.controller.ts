import { Body, Controller, OnModuleInit, Post, Req } from '@nestjs/common';
import TelegramBot from 'node-telegram-bot-api';
import { TelegramService } from './provider/telegram.service';
import { ApiTags } from '@nestjs/swagger';
import { skipAuth } from '@/shared/decorators';

@ApiTags('telegram')
@Controller('telegram')
export class TelegramController {
  private bot: TelegramBot;
  constructor(private readonly telegramService: TelegramService) {}

  @skipAuth()
  @Post('webhook')
  async receiveUpdate(@Body() body: any) {
    await this.telegramService.handleWebhookUpdate(body);
    return { ok: true };
  }
}
