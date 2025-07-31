import { Test, TestingModule } from '@nestjs/testing';
import { RomExistProvider } from './rom-exist.provider';

describe('RomExistProvider', () => {
  let provider: RomExistProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RomExistProvider],
    }).compile();

    provider = module.get<RomExistProvider>(RomExistProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
