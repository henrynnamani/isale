import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MailQueueProcessor } from './providers/mail-queue.processor';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    MailModule,
    BullModule.registerQueue({
      name: 'mail-queue',
      defaultJobOptions: {
        attempts: 4,
        removeOnComplete: true,
      },
    }),
  ],
  providers: [MailQueueProcessor],
  exports: [BullModule],
})
export class MailQueueModule {}
