import { forwardRef, Module } from '@nestjs/common';
import { VendorsController } from './vendors.controller';
import { VendorsService } from './provider/vendors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorExistProvider } from './providers/vendor-exist.provider';
import { Vendor } from './model/vendors.entity';
import { CreateSubaccountProvider } from './providers/create-subaccount.provider';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vendor]),
    forwardRef(() => ProductModule),
  ],
  providers: [VendorsService, VendorExistProvider, CreateSubaccountProvider],
  controllers: [VendorsController],
  exports: [VendorsService, VendorExistProvider],
})
export class VendorsModule {}
