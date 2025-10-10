import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { Repository } from 'typeorm';
import { Brand } from '../model/brand.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as SYS_MSG from '@/shared/system-message';
import { BrandExistProvider } from '../providers/brand-exist.provider';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    private readonly brandExistProvider: BrandExistProvider,
  ) {}
  async createBrand(createBrandDto: CreateBrandDto) {
    await this.brandExistProvider.checkBrandNotExist({
      name: createBrandDto.name,
    });

    const brand = this.brandRepository.create(createBrandDto);

    try {
      await this.brandRepository.save(brand);

      return {
        data: brand,
        message: SYS_MSG.BRAND_CREATED_SUCCESSFULLY,
      };
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }

  async deleteBrand(id: string) {
    const brand = await this.brandExistProvider.checkBrandNotExist({ id });

    try {
      await this.brandRepository.softDelete({
        id,
      });

      return {
        data: brand,
        message: SYS_MSG.BRAND_DELETED_SUCCESSFULLY,
      };
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }

  async getAllBrand() {
    try {
      const brands = await this.brandRepository.find();

      return brands;
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }
}

/**
 * When I delete brand, I want to delete every product with that brand
 */
