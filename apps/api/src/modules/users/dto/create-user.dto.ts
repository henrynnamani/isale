import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { UserRoleEnum } from 'src/shared/enum/user-role.enum';

export class CreateUserDto {
  @ApiProperty({
    example: 'Felix',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'felix@gmail.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional({
    example: 'becoming@TheBest8',
  })
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minSymbols: 1,
  })
  @IsOptional()
  password: string;

  @ApiPropertyOptional({
    example: '1u2819388googleID',
  })
  @IsOptional()
  @IsString()
  googleId: string;

  @ApiPropertyOptional({
    example: UserRoleEnum.USER,
    enum: UserRoleEnum,
    required: true,
  })
  @IsEnum(UserRoleEnum)
  @IsOptional()
  role: UserRoleEnum;
}
