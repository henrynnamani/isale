import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { VendorsService } from './provider/vendors.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { activateVendor } from './doc/activate-vendor.doc';
import { ApiTags } from '@nestjs/swagger';
import { deactivateVendor } from './doc/deactivate-vendor.doc';

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
}
