import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../model/category.entity';
import { Repository } from 'typeorm';
import * as SYS_MSG from '@/shared/system-message';

type optionalQuery = Partial<Pick<Category, 'id' | 'name'>>;

@Injectable()
export class CategoryExistProvider {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async checkCategoryDoesNotExist(query: optionalQuery) {
    try {
      const category = await this.categoryRepository.findOne({
        where: query,
      });

      if (category) {
        throw new NotFoundException(SYS_MSG.CATEGORY_ALREADY_EXIST);
      }

      return category;
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }

  async checkCategoryExist(query: optionalQuery) {
    try {
      const category = await this.categoryRepository.findOne({
        where: query,
      });

      if (!category) {
        throw new NotFoundException(SYS_MSG.CATEGORY_NOT_FOUND(query.name));
      }

      return category;
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }
}
