import { CursorPaginationDto } from '@/shared/pagination/pagination.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FetchVendorProductDto extends CursorPaginationDto {
  @ApiProperty({
    example: 'dfdfj-34hkdfh-3384029df-dfhksd',
    description: 'Vendor ID',
  })
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  id: string;
}
