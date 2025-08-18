import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateColorDto {
  @ApiProperty({
    example: 'blue',
    nullable: false,
    description: 'Name of color',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '0FF824',
    nullable: false,
    description: 'Color hex code',
  })
  @IsString()
  @MaxLength(6)
  @IsNotEmpty()
  hex: string;
}
