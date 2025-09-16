import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { MoreThan, Repository } from 'typeorm';
import { Product } from '../model/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SaveProductProvider } from '../providers/save-product.provider';
import * as SYS_MSG from '@/shared/system-message';
import { CursorPaginationDto } from '@/shared/pagination/pagination.dto';
import { PaginationService } from '@/shared/pagination/pagination.service';
import { FilterProductDto } from '../dto/filter-product.dto';
import { ProductDetailDto } from '../dto/product-detail.dto';
import { DeleteProductParamDto } from '../dto/delete-param.dto';
import { ProductExistProvider } from '../providers/product-exist.provider';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Color } from '@/modules/color/model/color.entity';
import { Ram } from '@/modules/ram/model/ram.entity';
import { Rom } from '@/modules/rom/model/rom.entity';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly saveProductProvider: SaveProductProvider,
    private readonly paginationService: PaginationService,
    private readonly productExistProvider: ProductExistProvider,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
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
      ['roms', 'rams', 'colors', 'vendor'],
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

    const result = await this.paginationService.cursorPaginate(
      query,
      paginationDto,
      [],
    );

    return {
      data: result,
      message: SYS_MSG.PRODUCT_LIST,
    };
  }

  async productDetail(productDetailDto: ProductDetailDto) {
    const { id } = productDetailDto;
    try {
      const product = await this.productRepository.findOneOrFail({
        where: { id },
      });

      return {
        data: product,
        message: SYS_MSG.PRODUCT_DETAIL_FETCHED_SUCCESSFULLY,
      };
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }

  async deleteProduct(deleteProductDto: DeleteProductParamDto) {
    const { id } = deleteProductDto;

    try {
      const product = await this.productExistProvider.checkProductExist(id);

      await this.productRepository.delete({
        id: product.id,
      });

      return {
        data: product,
        message: SYS_MSG.PRODUCT_DELETED_SUCCESSFULLY,
      };
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }

  async updateProduct(id: string, updateProductDto: Partial<UpdateProductDto>) {
    try {
      const product = await this.productExistProvider.checkProductExist(id);

      product.battery = updateProductDto.batteryHealth
        ? updateProductDto.batteryHealth
        : product.battery;
      product.condition = updateProductDto.condition
        ? updateProductDto.condition
        : product.condition;
      product.specification = updateProductDto.specification
        ? JSON.parse(updateProductDto.specification)
        : product.specification;
      product.images = updateProductDto.images
        ? updateProductDto.images
        : product.images;
      product.price = updateProductDto.price
        ? updateProductDto.price
        : product.price;
      product.name = updateProductDto.name
        ? updateProductDto.name
        : product.name;
      product.colors =
        updateProductDto.colors &&
        (updateProductDto.colors as unknown as Color[]);
      product.rams =
        updateProductDto.rams && (updateProductDto.rams as unknown as Ram[]);
      product.roms =
        updateProductDto.roms && (updateProductDto.roms as unknown as Rom[]);

      await this.productRepository.update({ id }, product);

      return {
        data: product,
        message: SYS_MSG.PRODUCT_UPDATED_SUCCESSFULLY,
      };
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }

  async fetchVendorProduct(
    vendorId: string,
    paginationDto: CursorPaginationDto,
  ) {
    try {
      const query = this.productRepository
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.vendor', 'vendor');

      query.andWhere('vendor.id = :vendorId', { vendorId });

      //TODO: convert to offset pagination
      const result = await this.paginationService.cursorPaginate(
        query,
        paginationDto,
        [],
      );

      return {
        data: result,
        message: SYS_MSG.VENDOR_PRODUCT_LIST,
      };
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }
}
