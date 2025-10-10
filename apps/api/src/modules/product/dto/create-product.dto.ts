import { ProductCondition } from '@/shared/enum/product-condition.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Iphone 11 Pro Max',
    description: 'product name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: true,
    description: 'product available',
  })
  @IsBoolean()
  @IsNotEmpty()
  available: boolean;

  // @ApiPropertyOptional({
  //   example: '{"screenSize":"6.5 inches","battery":"4000mAh"}',
  //   description: 'JSON string describing product specifications',
  //   type: String,
  // })
  // @IsJSON()
  // @IsOptional()
  // specification: string;

  @ApiProperty({
    example: [
      'https://www.pinterest.com/pin/16818198602388621/',
      'https://www.pinterest.com/pin/16818198602388621/',
      'https://www.pinterest.com/pin/16818198602388621/',
    ],
    description: 'color Ids',
  })
  @IsArray()
  @IsString({
    each: true,
  })
  @IsNotEmpty()
  images: string[];

  @ApiProperty({
    example: 'eW91ci10ZXh0LWhlcmU=',
    description: 'category ID',
  })
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({
    example: [
      'AAS27rU3SXeAfo8lOonM0g==',
      'n6nERGU5QbSiFF8nKo8FjA==',
      'AUo6HQT/R1iNRsWB4yH11Q==',
    ],
    description: 'color Ids',
  })
  @IsArray()
  @IsString({
    each: true,
  })
  @IsNotEmpty()
  colors: string[];

  @ApiProperty({
    example: 'S8WeG1wYROWX/TLPw9nstw==',
    description: 'brand ID',
  })
  @IsUUID()
  @IsNotEmpty()
  brandId: string;

  @ApiProperty({
    example: 2,
    description: 'In stock',
  })
  @IsInt()
  @IsNotEmpty()
  stock: number;

  @ApiProperty({
    example: [
      'AAS27rU3SXeAfo8lOonM0g==',
      'n6nERGU5QbSiFF8nKo8FjA==',
      'AUo6HQT/R1iNRsWB4yH11Q==',
    ],
    description: 'Rams Ids',
  })
  @IsArray()
  @IsString({
    each: true,
  })
  rams: string[];

  @ApiProperty({
    example: [
      'AAS27rU3SXeAfo8lOonM0g==',
      'n6nERGU5QbSiFF8nKo8FjA==',
      'AUo6HQT/R1iNRsWB4yH11Q==',
    ],
    description: 'Roms Ids',
  })
  @IsArray()
  @IsString({
    each: true,
  })
  roms: string[];

  @ApiProperty({
    example: ProductCondition.LONDON_USED,
    description: 'Current product condition',
  })
  @IsEnum(ProductCondition)
  @IsNotEmpty()
  condition: ProductCondition;

  @ApiProperty({
    example: 75828,
    description: 'Vendor ID',
  })
  @IsInt()
  @IsNotEmpty()
  chatId: number;

  @ApiProperty({
    example: 57,
    description: 'Gadget battery health',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  batteryHealth?: number;

  @ApiProperty({
    example: '17000000',
    description: 'product price',
  })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  price: number;
}
