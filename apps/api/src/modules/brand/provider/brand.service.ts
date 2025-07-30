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
import { create } from 'domain';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}
  async createBrand(createBrandDto: CreateBrandDto) {
    try {
      const brandExist = await this.brandRepository.findBy({
        name: createBrandDto.name,
      });

      if (brandExist) {
        throw new BadRequestException(
          SYS_MSG.BRAND_EXISTS(createBrandDto.name),
        );
      }
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }

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

  async deleteBrand() {}
}

/**
 * When I delete brand, I want to delete every product with that brand
 */
