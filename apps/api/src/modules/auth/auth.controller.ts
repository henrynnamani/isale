import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './provider/auth.service';
import { CreateAuthDoc } from '@/shared/doc-response';
import { VerifyEmailBodyDto, VerifyEmailDto } from './dto/verify-email.dto';
import { OtpService } from '../otp/provider/otp.service';
import { LoginDto } from './dto/login.dto';
import { skipAuth } from '@/shared/decorators';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Response } from 'express';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly otpService: OtpService,
  ) {}

  @Post('signup')
  @skipAuth()
  @CreateAuthDoc('Sign up', RegisterDto)
  register(@Body() registerDto: RegisterDto) {
    return this.authService.signup(registerDto);
  }

  @Post('verify')
  @skipAuth()
  @CreateAuthDoc('Verify email', VerifyEmailBodyDto)
  verifyEmail(
    @Query() verifyEmailDto: VerifyEmailDto,
    @Body() verifyEmailBodyDto: VerifyEmailBodyDto,
  ) {
    return this.otpService.verifyOtp(verifyEmailDto, verifyEmailBodyDto);
  }

  @Post('signin')
  @skipAuth()
  @CreateAuthDoc('Sign in', LoginDto)
  login(@Body() loginDto: LoginDto) {
    return this.authService.signin(loginDto);
  }

  @Post('refresh')
  @skipAuth()
  @CreateAuthDoc('Refresh token', RefreshTokenDto)
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refresh(refreshTokenDto);
  }

  @Get('google')
  signUpWithGoogle() {}
}
