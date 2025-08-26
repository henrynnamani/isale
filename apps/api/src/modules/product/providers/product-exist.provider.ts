import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../model/product.entity';
import { Repository } from 'typeorm';
import * as SYS_MSG from '@/shared/system-message';

@Injectable()
export class ProductExistProvider {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async checkProductExist(id: string) {
    try {
      const product = await this.productRepository.findOne({
        where: { id },
      });

      if (!product) {
        throw new NotFoundException(SYS_MSG.PRODUCT_DOES_NOT_EXIST);
      }

      return product;
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }
}
