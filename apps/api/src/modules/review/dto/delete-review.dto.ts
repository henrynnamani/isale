import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteReviewDto {
  @ApiProperty({
    example: '0de9ab4b-1d67-4264-bf3b-29f488a4fd8b',
    description: 'Review ID',
  })
  @IsString()
  @IsNotEmpty()
  id: string;
}
