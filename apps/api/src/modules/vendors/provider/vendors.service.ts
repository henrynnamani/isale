import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Vendor } from '../model/vendors.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { VendorExistProvider } from '../providers/vendor-exist.provider';
import { CreateSubaccountProvider } from '../providers/create-subaccount.provider';
import * as SYS_MSG from '@/shared/system-message';
import { CreateVendor } from '@/types';
import { ProductService } from '@/modules/product/provider/product.service';
import { CursorPaginationDto } from '@/shared/pagination/pagination.dto';
import { PaginationService } from '@/shared/pagination/pagination.service';

@Injectable()
export class VendorsService {
  constructor(
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
    private readonly vendorExistProvider: VendorExistProvider,
    private readonly createSubaccountProvider: CreateSubaccountProvider,
    private readonly productService: ProductService,
  ) {}

  async createVendor(createVendorDto: CreateVendor) {
    const vendorExist = await this.vendorExistProvider.checkVendorExistByChatId(
      createVendorDto.telegramChatId,
    );

    if (vendorExist) {
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

  async activateVendor(id: string) {
    const vendorExist = await this.vendorExistProvider.checkVendorExistById(id);

    if (!vendorExist) {
      throw new BadRequestException(SYS_MSG.VENDOR_NOT_FOUND);
    }

    try {
      const response = await this.vendorRepository.update(
        { id },
        { isVerified: true },
      );

      return {
        data: response,
        message: SYS_MSG.VENDOR_ACTIVATED_SUCCESSFULLY,
      };
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }

  async deactivateVendor(id: string) {
    const vendorExist = await this.vendorExistProvider.checkVendorExistById(id);

    if (!vendorExist) {
      throw new BadRequestException(SYS_MSG.VENDOR_NOT_FOUND);
    }

    try {
      const response = await this.vendorRepository.update(
        { id },
        { isVerified: false },
      );

      return {
        data: response,
        message: SYS_MSG.VENDOR_DEACTIVATED_SUCCESSFULLY,
      };
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }

  async vendorProducts(id: string, paginationDto: CursorPaginationDto) {
    return this.productService.fetchVendorProduct(id, paginationDto);
  }

  async getAllVendor() {
    try {
      const vendors = await this.vendorRepository.find({});

      return vendors;
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }
}
