import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { VendorsService } from './provider/vendors.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { activateVendor } from './doc/activate-vendor.doc';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { deactivateVendor } from './doc/deactivate-vendor.doc';
import { CursorPaginationDto } from '@/shared/pagination/pagination.dto';
import { CreateGetDoc } from '@/shared/doc-response';
import { FetchVendorProductDto } from './dto/fetch-vendor-product.dto';

@ApiTags('vendors')
@Controller('vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @activateVendor()
  @Patch(':id/activate')
  activateVendor(@Param('id') vendorId: string) {
    return this.vendorsService.activateVendor(vendorId);
  }

  @deactivateVendor()
  @Patch(':id/deactivate')
  deactivateVendor(@Param('id') vendorId: string) {
    return this.vendorsService.deactivateVendor(vendorId);
  }

  @Get(':id/products')
  @CreateGetDoc('Fetch vendor products', FetchVendorProductDto)
  fetchVendorProduct(
    @Param()
    fetchVendorProductParamDto: FetchVendorProductDto & CursorPaginationDto,
  ) {
    return this.vendorsService.vendorProducts(fetchVendorProductParamDto.id, {
      limit: fetchVendorProductParamDto.limit,
      cursor: fetchVendorProductParamDto.cursor,
    });
  }
}
