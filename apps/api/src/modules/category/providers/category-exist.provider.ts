import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../model/category.entity';
import { Repository } from 'typeorm';
import * as SYS_MSG from '@/shared/system-message';

@Injectable()
export class CategoryExistProvider {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async checkCategoryExist(name: string) {
    try {
      const category = await this.categoryRepository.findOne({
        where: {
          name,
        },
      });

      return category;
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }
}
