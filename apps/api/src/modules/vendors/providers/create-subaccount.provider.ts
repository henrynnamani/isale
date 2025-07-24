import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { CreateVendorDto } from '../dto/create-vendor.dto';
import { PERCENTAGE_CHARGE } from '@/constant';
import { VENDOR_SUBACCOUNT_PAYLOAD_DESCRIPTION } from '@/shared/system-message';
import { CreateVendor } from '@/types';

@Injectable()
export class CreateSubaccountProvider {
  constructor(private readonly configService: ConfigService) {}

  async createVendorSubaccount(createVendorDto: CreateVendor) {
    const payload = {
      business_name: createVendorDto.name,
      bank_code: createVendorDto.bankCode,
      account_number: createVendorDto.accountNumber,
      percentage_charge: PERCENTAGE_CHARGE,
      description: VENDOR_SUBACCOUNT_PAYLOAD_DESCRIPTION,
    };

    const response = await axios.post(
      `${this.configService.get('payment.paystackBaseUrl')}/subaccount`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${this.configService.get('payment.paystackSecretKey')}`,
          'Content-Type': 'application/json',
        },
      },
    );

    console.log(response);

    return response?.data && response.data?.data?.subaccount_code;
  }
}
