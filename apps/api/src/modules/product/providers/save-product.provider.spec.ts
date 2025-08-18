import { Test, TestingModule } from '@nestjs/testing';
import { SaveProductProvider } from './save-product.provider';

describe('SaveProductProvider', () => {
  let provider: SaveProductProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaveProductProvider],
    }).compile();

    provider = module.get<SaveProductProvider>(SaveProductProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
