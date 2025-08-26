import { Test, TestingModule } from '@nestjs/testing';
import { ProductExistProvider } from './product-exist.provider';

describe('ProductExistProvider', () => {
  let provider: ProductExistProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductExistProvider],
    }).compile();

    provider = module.get<ProductExistProvider>(ProductExistProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
