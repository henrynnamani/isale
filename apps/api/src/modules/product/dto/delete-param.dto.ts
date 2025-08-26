import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteProductParamDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
