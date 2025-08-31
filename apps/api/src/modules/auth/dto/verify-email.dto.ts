import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class VerifyEmailDto {
  @ApiProperty({
    example: '458234',
    description: 'Verification token',
  })
  @IsString()
  @IsNotEmpty()
  token: string;
}

export class VerifyEmailBodyDto {
  @ApiProperty({
    example: 'hoyx0101@gmail.com',
    description: 'User email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
