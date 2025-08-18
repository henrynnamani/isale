import { Test, TestingModule } from '@nestjs/testing';
import { RamExistProvider } from './ram-exist.provider';

describe('RamExistProvider', () => {
  let provider: RamExistProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RamExistProvider],
    }).compile();

    provider = module.get<RamExistProvider>(RamExistProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
