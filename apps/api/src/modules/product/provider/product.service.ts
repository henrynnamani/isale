import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { MoreThan, Repository } from 'typeorm';
import { Product } from '../model/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SaveProductProvider } from '../providers/save-product.provider';
import * as SYS_MSG from '@/shared/system-message';
import { CursorPaginationDto } from '@/shared/pagination/pagination.dto';
import { PaginationService } from '@/shared/pagination/pagination.service';
import { FilterProductDto } from '../dto/filter-product.dto';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly saveProductProvider: SaveProductProvider,
    private readonly paginationService: PaginationService,
  ) {}

  // TODO: Add a image creation functionality on the fly
  async createProduct(createProductDto: CreateProductDto) {
    // upload image
    const product =
      await this.saveProductProvider.saveProduct(createProductDto);

    return {
      data: product,
      message: SYS_MSG.PRODUCT_CREATED_SUCCESSFULLY,
    };
  }

  async getProducts(paginationDto: CursorPaginationDto) {
    const result = await this.paginationService.cursorPaginate(
      this.productRepository,
      paginationDto,
    );

    return {
      data: result,
      message: SYS_MSG.PRODUCT_LIST,
    };
  }

  async filterProducts(
    filterProductDto: FilterProductDto,
    paginationDto: CursorPaginationDto,
  ) {
    const {
      brandId,
      categoryId,
      condition,
      name,
      rams,
      roms,
      minPrice,
      maxPrice,
      colors,
      battery,
    } = filterProductDto;

    const query = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('product.colors', 'colors')
      .leftJoinAndSelect('product.rams', 'rams')
      .leftJoinAndSelect('product.roms', 'roms');

    if (name) {
      query.andWhere('LOWER(product.name) LIKE :name', {
        name: `%${name.toLowerCase()}%`,
      });
    }

    if (brandId) {
      query.andWhere('brand.id = :brandId', { brandId });
    }

    if (categoryId) {
      query.andWhere('category.id = :categoryId', { categoryId });
    }

    if (battery) {
      query.andWhere('product.battery >= :battery', { battery });
    }

    if (rams && rams.length > 0) {
      query.andWhere('rams.id IN (:...ramIds)', {
        ramIds: Array.isArray(rams) ? rams : [rams],
      });
    }

    if (roms && roms.length > 0) {
      query.andWhere('roms.id IN (:...romIds)', {
        romIds: Array.isArray(roms) ? roms : [roms],
      });
    }

    if (colors && colors.length > 0) {
      query.andWhere('colors.id IN (:...colorIds)', {
        colorIds: Array.isArray(colors) ? colors : [colors],
      });
    }

    if (condition) {
      query.andWhere('product.condition = :condition', { condition });
    }

    if (minPrice) {
      query.andWhere('product.price >= :minPrice', { minPrice });
    }

    if (maxPrice) {
      query.andWhere('product.price >= :maxPrice', { maxPrice });
    }

    const result = await this.paginationService.cursorPaginateQuery(
      query,
      paginationDto,
    );

    return {
      data: result,
      message: SYS_MSG.PRODUCT_LIST,
    };
  }
}
