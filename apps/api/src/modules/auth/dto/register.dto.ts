import { UserRoleEnum } from '@/shared/enum/user-role.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Matches,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'Joy akpan',
    description: 'User name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'joy@gmail.com',
    description: 'User email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Pyr@hornet01038sd',
    description: 'User password',
  })
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
  })
  password: string;

  @ApiProperty({
    example: '+2347052899465',
    description: 'User phone number',
  })
  @IsString()
  @Matches(/^\+234[0-9]{10}$/, {
    message: 'Phone number must start with +234 and be followed by 10 digits',
  })
  phoneNumber: string;

  @ApiPropertyOptional({
    enum: UserRoleEnum,
    default: UserRoleEnum.USER,
    description: 'Default role',
  })
  @IsEnum(UserRoleEnum)
  @IsOptional()
  role?: UserRoleEnum;
}
