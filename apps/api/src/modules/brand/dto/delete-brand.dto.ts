import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class deleteBrandDto {
  @ApiProperty({
    example: 'dfhshdf-3rh9sf-sdfkhsh',
    description: 'Brand ID',
  })
  @IsString()
  @IsNotEmpty()
  id: string;
}
