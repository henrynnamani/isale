import { Body, Controller, OnModuleInit, Post, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import TelegramBot from 'node-telegram-bot-api';
import { TelegramService } from './provider/telegram.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('telegram')
@Controller('telegram')
export class TelegramController {
  private bot: TelegramBot;
  constructor(private readonly telegramService: TelegramService) {}

  @Post('webhook')
  async receiveUpdate(@Body() body: any) {
    await this.telegramService.handleWebhookUpdate(body);
    return { ok: true };
  }
}
