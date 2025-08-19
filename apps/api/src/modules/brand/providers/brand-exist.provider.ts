import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from '../model/brand.entity';
import { Repository } from 'typeorm';
import * as SYS_MSG from '@/shared/system-message';

type optionalQuery = Partial<Pick<Brand, 'name' | 'id'>>;

@Injectable()
export class BrandExistProvider {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  async checkBrandExist(query: optionalQuery) {
    try {
      const brandExist = await this.brandRepository.findOne({
        where: query,
      });

      if (!brandExist) {
        throw new BadRequestException(SYS_MSG.BRAND_DOES_NOT_EXIST(query.name));
      }

      return brandExist;
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }

  async checkBrandNotExist(query: optionalQuery) {
    try {
      const brandExist = await this.brandRepository.findOne({
        where: {
          ...query,
        },
      })[0];

      if (brandExist) {
        throw new BadRequestException(SYS_MSG.BRAND_EXISTS(brandExist.name));
      }
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }
}
