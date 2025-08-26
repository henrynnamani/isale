import { IsNotEmpty, IsString } from 'class-validator';

export class ClearCartParamDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
