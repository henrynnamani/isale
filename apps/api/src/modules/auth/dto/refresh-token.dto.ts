import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwNzcyNzAwLWU3MzctNGNlOS1iNzc2LTU5MjI5OTA5ZTAxNiIsImVtYWlsIjoiZmVsaWNpYUBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTc1NjYxOTA5NiwiZXhwIjoxNzU2NjI5ODk2fQ.KwbQmdaSU2xnRRsas3QDxDNpcbeFuf6S-Oz2X2kpFt0',
    description: 'Access token',
  })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({
    example: 'hoyx0101@gmail.com',
    description: 'User Email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
