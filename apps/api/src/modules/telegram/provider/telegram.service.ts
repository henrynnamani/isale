import { CloudinaryService } from '@/modules/cloudinary/provider/cloudinary.service';
import { VendorsService } from '@/modules/vendors/provider/vendors.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import TelegramBot from 'node-telegram-bot-api';
import { CreateVendor } from '@/types';
import { Category } from '@/modules/category/model/category.entity';
import { Color } from '@/modules/color/model/color.entity';
import { ProductCondition } from '@/shared/enum/product-condition.enum';
import { retryWhen } from 'rxjs';
import { BrandService } from '@/modules/brand/provider/brand.service';
import { CategoryService } from '@/modules/category/provider/category.service';
import { RamService } from '@/modules/ram/provider/ram.service';
import { RomService } from '@/modules/rom/provider/rom.service';
import { ColorService } from '@/modules/color/provider/color.service';
import { ProductService } from '@/modules/product/provider/product.service';

interface VendorProduct {
  name: string;
  images: string[];
  onDiscount: boolean;
  trueTone: boolean;
  faceId: boolean;
  specification: Record<string, any>;
  category: Category;
  colors: Color[];
  brandId: string;
  ramId: string;
  romId: string;
  battery: number;
  condition: ProductCondition;
  price: number;
  stock: number;
}

@Injectable()
export class TelegramService {
  private bot: TelegramBot;
  private sessions = new Map<number, any>();
  constructor(
    private readonly config: ConfigService,
    private readonly vendorService: VendorsService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly brandService: BrandService,
    private readonly categoryService: CategoryService,
    private readonly ramsService: RamService,
    private readonly romsService: RomService,
    private readonly colorsService: ColorService,
    private readonly productService: ProductService,
  ) {}

  async handleLogoUpload(chatId: number, msg: any, session: any) {
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
            err?.response?.data?.message || err?.message || 'An error occurred';

          await this.bot.sendMessage(chatId, `❌ Error: ${errorMessage}`);
        }
        this.sessions.delete(chatId);
      });
  }

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

      console.log(session);

      if (!session) {
        await this.bot.sendMessage(
          chatId,
          '❌ Unexpected photo. Use /add to start.',
        );
        return;
      }

      if (session.awaiting_logo) {
        return this.handleLogoUpload(chatId, msg, session);
      }

      if (session.step === 'awaiting_product_photo') {
        const photos = msg.photo;
        const largestPhoto = photos[photos.length - 1];
        const file = await this.bot.getFile(largestPhoto.file_id);

        const imageUrl =
          await this.cloudinaryService.uploadVendorImageToCloudinary(
            file.file_path,
          );

        session.product = {
          ...session.product,
          images: [imageUrl],
        };

        await this.productService
          .createProduct(session.product)
          .then(async () => {
            await this.bot.sendMessage(chatId, 'Successfully uploaded ✅');
          });
        return;
      }
    });

    this.bot.on('callback_query', async (callbackQuery) => {
      const chatId = callbackQuery.message?.chat.id as number;
      const data = callbackQuery.data as string;

      const session = this.sessions.get(chatId);

      console.log(session);

      if (data === 'confirm_bank') {
        this.bankConfirmationFlow(chatId, session);
      }

      if (data.startsWith('brand_')) {
        session.product.brandId = data.split('brand_')[1];
        session.step = 'awaiting_category';
        await this.askCategory(chatId);
      } else if (data.startsWith('category_')) {
        session.product.categoryId = data.split('category_')[1];
        session.step = 'awaiting_colors';
        await this.askColors(chatId);
      } else if (data.startsWith('color_')) {
        const color = data.split('color_')[1];
        session.product.colors = [color]; // keep simple
        session.step = 'awaiting_ram';
        await this.askRam(chatId);
      } else if (data.startsWith('ram_')) {
        session.product.rams = [data.split('ram_')[1]];
        session.step = 'awaiting_rom';
        await this.askRom(chatId);
      } else if (data.startsWith('rom_')) {
        session.product.roms = [data.split('rom_')[1]];
        session.step = 'awaiting_condition';
        await this.askCondition(chatId);
      } else if (data.startsWith('condition_')) {
        session.product.condition = data.split('condition_')[1];
        session.step = 'awaiting_battery';
        await this.bot.sendMessage(
          chatId,
          '🔋 Enter battery health percentage (e.g., 92)',
        );
      } else if (data === 'trueTone_yes' || data === 'trueTone_no') {
        session.product.trueTone = data === 'trueTone_yes';
        session.step = 'awaiting_faceId';
        await this.bot.sendMessage(chatId, '🔐 Does it have Face ID?', {
          reply_markup: {
            inline_keyboard: [
              [{ text: '✅ Yes', callback_data: 'faceId_yes' }],
              [{ text: '❌ No', callback_data: 'faceId_no' }],
            ],
          },
        });
      } else if (data === 'faceId_yes' || data === 'faceId_no') {
        session.product.faceId = data === 'faceId_yes';
        session.step = 'awaiting_price';
        await this.bot.sendMessage(chatId, '💰 Enter price (₦)');
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

  public async notifyVendorOfOrder(
    chatId: number,
    photo: string,
    payload: any,
  ) {
    return this.bot.sendPhoto(chatId, photo, {
      caption:
        `🚀 *New Order Alert!*\n\n` +
        `🛒 *Product:* ${payload.productName}\n` +
        `📦 *Quantity:* ${payload.quantity}\n` +
        `💰 *Total:* ₦${payload.totalAmount}\n\n` +
        `👤 *Customer:* ${payload.customerName}\n` +
        `📞 *Phone:* ${payload.phoneNumber}`,
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '🚚 On Delivery',
              callback_data: `on_delivery_${payload.orderId}`,
            },
            {
              text: '✅ Completed',
              callback_data: `completed_${payload.orderId}`,
            },
            { text: '❌ Cancel', callback_data: `cancel_${payload.orderId}` },
          ],
        ],
      },
    });
  }

  public async handleWebhookUpdate(body: any) {
    this.bot.processUpdate(body);
    const message = body.message;
    if (!message) return;

    const chatId = message.chat.id;

    const text = message.text?.trim();

    if (text === '/analytics') {
      this.sessions.set(chatId, { step: 'awaiting_product_photo' });
      await this.bot.sendMessage(
        chatId,
        '📸 Please upload a clear photo of the iPhone.',
      );
      return;
    }

    if (text === '/add') {
      this.sessions.set(chatId, { step: 'awaiting_name', product: {} });
      await this.bot.sendMessage(
        chatId,
        '📝 Enter product name (e.g., iPhone 13 Pro Max)',
      );
      return;
    }

    if (text === '/register') {
      this.sessions.set(chatId, { step: 'awaiting_name' });
      await this.bot.sendMessage(chatId, '📝 What is your Product name?');
      return;
    }

    const session = this.sessions.get(chatId);
    if (!session) return;

    if (session.step === 'awaiting_name') {
      session.product.name = text;
      session.step = 'awaiting_brand';

      const brands = await this.brandService.getAllBrand();
      await this.bot.sendMessage(chatId, '🏷️ Select brand:', {
        reply_markup: {
          inline_keyboard: brands.map((b) => [
            { text: b.name, callback_data: `brand_${b.id}` },
          ]),
        },
      });
    } else if (session.step === 'awaiting_battery') {
      session.product.battery = Number(text);
      session.step = 'awaiting_trueTone';
      await this.bot.sendMessage(chatId, '🔎 Does it have True Tone?', {
        reply_markup: {
          inline_keyboard: [
            [{ text: '✅ Yes', callback_data: 'trueTone_yes' }],
            [{ text: '❌ No', callback_data: 'trueTone_no' }],
          ],
        },
      });
    } else if (session.step === 'awaiting_price') {
      session.product.price = Number(text);
      session.step = 'awaiting_stock';
      await this.bot.sendMessage(chatId, '📦 Enter stock quantity:');
    } else if (session.step === 'awaiting_stock') {
      session.product.stock = Number(text);
      session.step = 'awaiting_product_photo';
      await this.bot.sendMessage(
        chatId,
        '📸 Upload product photo(s) now. Send /done when finished.',
      );
    }

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

  private async askCategory(chatId: number) {
    const categories = await this.categoryService.getAllCategory();
    await this.bot.sendMessage(chatId, '📂 Select category:', {
      reply_markup: {
        inline_keyboard: categories.map((c) => [
          { text: c.name, callback_data: `category_${c.id}` },
        ]),
      },
    });
  }

  private async askColors(chatId: number) {
    const colors = await this.colorsService.getAllColor();
    await this.bot.sendMessage(chatId, '🎨 Select color:', {
      reply_markup: {
        inline_keyboard: colors.map((c) => [
          { text: c.name, callback_data: `color_${c.id}` },
        ]),
      },
    });
  }

  private async askRam(chatId: number) {
    const rams = await this.ramsService.getAllRam();
    // TODO: Replace with DB RAMs
    await this.bot.sendMessage(chatId, '💾 Select RAM size:', {
      reply_markup: {
        inline_keyboard: rams.map((r) => [
          { text: `${r.size} GB`, callback_data: `ram_${r.id}` },
        ]),
      },
    });
  }

  private async askRom(chatId: number) {
    // TODO: Replace with DB ROMs
    const roms = await this.romsService.getAllRom();
    await this.bot.sendMessage(chatId, '💽 Select ROM size:', {
      reply_markup: {
        inline_keyboard: roms.map((r) => [
          { text: `${r.size} GB`, callback_data: `rom_${r.id}` },
        ]),
      },
    });
  }

  private async askCondition(chatId: number) {
    await this.bot.sendMessage(chatId, '📦 Select phone condition:', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Brand New', callback_data: 'condition_Brand_New' }],
          [{ text: 'Refurbished', callback_data: 'condition_Refurbished' }],
          [{ text: 'London Used', callback_data: 'condition_London_Used' }],
          [{ text: 'Fairly Used', callback_data: 'condition_Fairly_Used' }],
        ],
      },
    });
  }
}
