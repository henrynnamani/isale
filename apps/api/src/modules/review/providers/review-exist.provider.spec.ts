import { Test, TestingModule } from '@nestjs/testing';
import { ReviewExistProvider } from './review-exist.provider';

describe('ReviewExistProvider', () => {
  let provider: ReviewExistProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewExistProvider],
    }).compile();

    provider = module.get<ReviewExistProvider>(ReviewExistProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
