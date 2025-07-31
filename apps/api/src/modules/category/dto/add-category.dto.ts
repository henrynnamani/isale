import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class AddCategoryDto {
  @ApiProperty({
    example: 'Smartphone',
    nullable: false,
    description: 'Product category name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'This contain Iphones, Samsungs, Redmi',
    nullable: false,
    description: 'Product category description',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  description: string;
}
