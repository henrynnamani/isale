import { Test, TestingModule } from '@nestjs/testing';
import { BrandExistProvider } from './brand-exist.provider';

describe('BrandExistProvider', () => {
  let provider: BrandExistProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrandExistProvider],
    }).compile();

    provider = module.get<BrandExistProvider>(BrandExistProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
