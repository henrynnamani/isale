import { CloudinaryService } from '@/modules/cloudinary/provider/cloudinary.service';
import { VendorsService } from '@/modules/vendors/provider/vendors.service';
import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import TelegramBot from 'node-telegram-bot-api';
import * as SYS_MSG from '@/shared/system-message';
import { CreateVendor } from '@/types';

@Injectable()
export class TelegramService {
  private bot: TelegramBot;
  private sessions = new Map<number, any>();
  constructor(
    private readonly config: ConfigService,
    private readonly vendorService: VendorsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  onModuleInit() {
    const token = this.config.get<string>('telegram.botToken');
    const domain = this.config.get('telegram.callbackUrl');

    this.bot = new TelegramBot(token);

    this.bot
      .setWebHook(`${domain}`)
      .then(() => {
        console.log('webhook set successfully');
      })
      .catch(console.error);

    this.bot.on('photo', async (msg) => {
      const chatId = msg.chat.id;
      const session = this.sessions.get(chatId);

      if (!session || !session.awaiting_logo) {
        await this.bot.sendMessage(
          chatId,
          '❌ Unexpected image. Please follow the instructions.',
        );
        return;
      }

      const photos = msg.photo;
      if (!photos || photos.length === 0) {
        await this.bot.sendMessage(
          chatId,
          'No image received. Please try again.',
        );
        return;
      }

      const largestPhoto = photos[photos.length - 1];
      const fileId = largestPhoto.file_id;
      const file = await this.bot.getFile(fileId);

      await this.cloudinaryService
        .uploadVendorImageToCloudinary(file.file_path)
        .then(async (res) => {
          await this.bot.sendMessage(chatId, '✅ Logo received and saved!');

          console.log(res);

          const payload: CreateVendor = {
            email: session.email,
            phoneNumber: session.phone,
            accountNumber: session.account,
            bankCode: session.bank,
            name: session.name,
            telegramChatId: chatId,
            logoImageUrl: res as string,
          };

          try {
            await this.vendorService
              .createVendor(payload)
              .then(
                async () =>
                  await this.bot.sendMessage(
                    chatId,
                    '🔥 Account Created Successfully',
                  ),
              );
          } catch (err: any) {
            const errorMessage =
              err?.response?.data?.message ||
              err?.message ||
              'An error occurred';

            await this.bot.sendMessage(chatId, `❌ Error: ${errorMessage}`);
          }
          this.sessions.delete(chatId);
        });
    });

    this.bot.on('callback_query', async (callbackQuery) => {
      const chatId = callbackQuery.message?.chat.id as number;
      const data = callbackQuery.data as string;

      const session = this.sessions.get(chatId);

      // if (!session) return;

      if (data === 'confirm_bank') {
        this.bankConfirmationFlow(chatId, session);
      }
    });
  }

  public async bankConfirmationFlow(chatId: number, session: any) {
    await this.bot.sendMessage(chatId, 'Processing... ⏳');

    try {
      await this.bot.sendMessage(chatId, '✅ Bank Account Confirmed!');
      await this.bot.sendMessage(
        chatId,
        '🖼️ Please upload your business logo:',
      );

      session.awaiting_logo = true;
    } catch (err) {
      console.error(err);
      await this.bot.sendMessage(
        chatId,
        '❌ Something went wrong during registration.',
      );
    }

    // this.sessions.delete(chatId);
    return;
  }

  public async handleWebhookUpdate(body: any) {
    this.bot.processUpdate(body);
    const message = body.message;
    if (!message) return;

    const chatId = message.chat.id;

    const text = message.text?.trim();

    if (text === '/register') {
      this.sessions.set(chatId, { step: 'name' });
      await this.bot.sendMessage(chatId, '📝 What is your business name?');
      return;
    }

    const session = this.sessions.get(chatId);
    if (!session) return;

    // if (session.step === 'set_location') {
    //   console.log(message)
    //   session.location = message.text
    //   const vendor = await this.vendorService.getVendorByChatId(chatId);
    // }

    if (session?.step === 'phone' && message.contact) {
      if (message.contact.user_id !== message.from.id) {
        await this.bot.sendMessage(chatId, '⚠️ Please share your own contact.');
        return;
      }

      session.phone = message.contact.phone_number;
      session.step = 'email';

      await this.bot.sendMessage(chatId, '📧 What is your email address?', {
        reply_markup: { remove_keyboard: true },
      });

      return; // ✅ Done for contact step
    }

    if (session?.step === 'name') {
      session.name = text;
      session.step = 'phone';
      await this.bot.sendMessage(chatId, '📞 Please share your phone number:', {
        reply_markup: {
          keyboard: [[{ text: 'Share Contact', request_contact: true }]],
          one_time_keyboard: true,
          resize_keyboard: true,
        },
      });
    } else if (session.step === 'email') {
      session.email = text;
      session.step = 'bank';

      await this.bot.sendMessage(chatId, '📍 Select Bank:', {
        reply_markup: {
          keyboard: [[{ text: 'Opay' }, { text: 'Palmpay' }]],
          one_time_keyboard: true,
          resize_keyboard: true,
        },
      });
      // this.sessions.delete(chatId);
    } else if (session.step === 'bank') {
      session.bank = text === 'Opay' ? 999992 : 999991;
      session.step = 'account_number';

      await this.bot.sendMessage(chatId, '🏦 Enter your account number');
    } else if (session.step === 'account_number') {
      session.account = text;
      session.step = 'bank_confirmation';
      let response;

      try {
        response = await axios.get(
          `${this.config.get('payment.paystackBaseUrl')}/bank/resolve?account_number=${session.account}&bank_code=${session.bank}`,
          {
            headers: {
              Authorization: `Bearer ${this.config.get('payment.paystackSecretKey')}`,
            },
          },
        );
      } catch (err) {
        session.step = 'account_number';
        await this.bot.sendMessage(
          chatId,
          'Kindly Enter a correct account number',
        );
        return;
      }
      await this.bot.sendMessage(
        chatId,
        `📍 Account Name: ${response.data.data.account_name}`,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Confirm ✅', callback_data: 'confirm_bank' }],
            ],
          },
        },
      );
    }
  }
}
