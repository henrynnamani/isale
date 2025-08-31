import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SendMailDto {
  @ApiProperty({
    example: 'hoyx0101@gmail.com',
    description: 'Recipient email',
  })
  @IsString()
  @IsNotEmpty()
  to: string;

  @ApiProperty({
    example: 'Garry hill',
    description: 'Recipient name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'hello, welcome to Isale here is your OTP code',
    description: 'email content',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}
