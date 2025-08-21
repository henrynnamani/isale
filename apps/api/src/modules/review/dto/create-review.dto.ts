import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max, MaxLength } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    example: 'xh93jsf-3s88df92-skdfhs',
    description: 'Reviewer ID',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    example: 'Had a second doubt, but I enjoyed it.',
    description: 'review content',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  review: string;

  @ApiProperty({
    example: 3,
    description: 'vendor rating',
  })
  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @ApiProperty({
    example: 'xh93jsf-3s88df92-skdfhs',
    description: 'Vendor ID',
  })
  @IsString()
  @IsNotEmpty()
  vendorId: string;
}
