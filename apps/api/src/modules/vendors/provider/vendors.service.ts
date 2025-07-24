import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateVendorDto } from '../dto/create-vendor.dto';
import { Repository } from 'typeorm';
import { Vendor } from '../model/vendors.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { VendorExistProvider } from '../providers/vendor-exist.provider';
import { CreateSubaccountProvider } from '../providers/create-subaccount.provider';
import * as SYS_MSG from '@/shared/system-message';
import { CreateVendor } from '@/types';

@Injectable()
export class VendorsService {
  constructor(
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
    private readonly vendorExistProvider: VendorExistProvider,
    private readonly createSubaccountProvider: CreateSubaccountProvider,
  ) {}

  async createVendor(createVendorDto: CreateVendor) {
    const vendorExists = await this.vendorExistProvider.checkVendorExist(
      createVendorDto.telegramChatId,
    );

    if (vendorExists?.length > 0) {
      throw new BadRequestException(SYS_MSG.VENDOR_EXISTS);
    }

    const subaccount =
      await this.createSubaccountProvider.createVendorSubaccount(
        createVendorDto,
      );

    const vendor = this.vendorRepository.create({
      ...createVendorDto,
      subaccount: subaccount,
    });

    try {
      await this.vendorRepository.save(vendor);

      return vendor;
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }

  async updateVendorLogoImage(chatId: number, logoImageUrl: string) {
    const vendorExists = this.vendorExistProvider.checkVendorExist(chatId);

    const updatedVendor = await this.vendorRepository.update(
      { telegramChatId: chatId },
      { logoImageUrl },
    );

    return this.updateVendorLogoImage;
  }

  async activateVendor() {}

  async deactivateVendor() {}

  async changeVendorBankAccount() {}
}
