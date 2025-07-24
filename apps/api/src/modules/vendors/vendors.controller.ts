import { Body, Controller } from '@nestjs/common';
import { VendorsService } from './provider/vendors.service';
import { CreateVendorDto } from './dto/create-vendor.dto';

@Controller('vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  
}
