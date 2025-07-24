import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from '../model/vendors.entity';
import * as SYS_MSG from '@/shared/system-message';

@Injectable()
export class VendorExistProvider {
  constructor(
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
  ) {}
  async checkVendorExist(chatId: number) {
    try {
      const vendor = await this.vendorRepository.findBy({
        telegramChatId: chatId,
      });
      return vendor;
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }
}
