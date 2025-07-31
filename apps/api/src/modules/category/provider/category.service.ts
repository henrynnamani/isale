import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { AddCategoryDto } from '../dto/add-category.dto';
import { CategoryExistProvider } from '../providers/category-exist.provider';
import * as SYS_MSG from '@/shared/system-message';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../model/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly categoryExistProvider: CategoryExistProvider,
  ) {}

  async addCategory(addCategoryDto: AddCategoryDto) {
    const category = await this.categoryExistProvider.checkCategoryExist(
      addCategoryDto.name,
    );

    if (category) {
      throw new BadRequestException(SYS_MSG.CATEGORY_ALREADY_EXIST);
    }

    try {
      const newCategory = this.categoryRepository.create(addCategoryDto);

      await this.categoryRepository.save(newCategory);

      return {
        data: newCategory,
        message: SYS_MSG.CATEGORY_SUCCESSFULLY_CREATED,
      };
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }
}
