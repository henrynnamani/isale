import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateVendorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  subaccount: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @IsString()
  @IsOptional()
  logoImageUrl: string;

  @IsNumber()
  @IsNotEmpty()
  telegramChatId: number;

  @IsNumber()
  @IsNotEmpty()
  bankCode: number;

  @IsNumber()
  @IsOptional()
  rating: number;
}
