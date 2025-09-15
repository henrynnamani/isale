import { MailService } from '@/modules/mail/provider/mail.service';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

interface SendOtpCode {
  email: string;
  subject: string;
  templateName: string;
  context: string;
}

@Processor('mail-queue')
export class MailQueueProcessor {
  constructor(private readonly mailService: MailService) {}

  @Process('send-otp-code')
  async handleSendOtpCode(job: Job<SendOtpCode>) {
    const { context, email: to, subject, templateName } = job.data;

    await this.mailService.sendEmail(to, subject, templateName, context);
  }
}
