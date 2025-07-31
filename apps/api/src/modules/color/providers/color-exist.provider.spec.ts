import { Test, TestingModule } from '@nestjs/testing';
import { ColorExistProvider } from './color-exist.provider';

describe('ColorExistProvider', () => {
  let provider: ColorExistProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ColorExistProvider],
    }).compile();

    provider = module.get<ColorExistProvider>(ColorExistProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
