import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../model/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { BrandExistProvider } from '@/modules/brand/providers/brand-exist.provider';
import { CategoryExistProvider } from '@/modules/category/providers/category-exist.provider';
import { RamExistProvider } from '@/modules/ram/providers/ram-exist.provider';
import { RomExistProvider } from '@/modules/rom/providers/rom-exist.provider';
import { VendorExistProvider } from '@/modules/vendors/providers/vendor-exist.provider';
import * as SYS_MSG from '@/shared/system-message';
import { ColorExistProvider } from '@/modules/color/providers/color-exist.provider';
import { Brand } from '@/modules/brand/model/brand.entity';

@Injectable()
export class SaveProductProvider {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly brandExist: BrandExistProvider,
    private readonly categoryExist: CategoryExistProvider,
    private readonly ramExist: RamExistProvider,
    private readonly romExist: RomExistProvider,
    private readonly vendorExist: VendorExistProvider,
    private readonly colorExist: ColorExistProvider,
  ) {}

  async saveProduct(createProductDto: CreateProductDto) {
    const brand = await this.brandExist.checkBrandExist({
      id: createProductDto.brandId,
    });

    const category = await this.categoryExist.checkCategoryExist({
      id: createProductDto.categoryId,
    });

    const colors = await this.colorExist.getColorEntities(
      createProductDto.colors,
    );

    const rams = await this.ramExist.getRamEntities(createProductDto.rams);

    const roms = await this.romExist.getRomEntities(createProductDto.roms);

    const vendor = await this.vendorExist.checkVendorExistByChatId(
      createProductDto.chatId,
    );

    const payload = {
      colors,
      category,
      brand,
      condition: createProductDto.condition,
      rams,
      roms,
      images: createProductDto.images,
      name: createProductDto.name,
      price: createProductDto.price,
      vendor,
      // specification:
      //   createProductDto.specification ??
      //   JSON.parse(createProductDto.specification),
    };

    try {
      const product = this.productRepository.create(payload);

      await this.productRepository.save(product);

      return product;
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }
}
