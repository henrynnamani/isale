import { Test, TestingModule } from '@nestjs/testing';
import { MailQueueProcessor } from './mail-queue.processor';

describe('MailQueueProcessor', () => {
  let provider: MailQueueProcessor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailQueueProcessor],
    }).compile();

    provider = module.get<MailQueueProcessor>(MailQueueProcessor);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
