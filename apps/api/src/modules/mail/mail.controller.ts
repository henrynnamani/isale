import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './provider/mail.service';
import { SendMailDto } from './dto/send-mail.dto';
import { CreateDoc } from '@/shared/doc-response';
import { ApiTags } from '@nestjs/swagger';

@Controller('mail')
@ApiTags('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('')
  @CreateDoc('Send mail', SendMailDto)
  async sendMail(@Body() body: SendMailDto) {
    await this.mailService.sendEmail(body.to, 'Welcome to I4sale', 'welcome', {
      name: body.name,
      message: body.message,
      subject: 'Welcome',
      verification_url: ``
    });

    return {
      message: 'Email sent successfully',
    };
  }
}
