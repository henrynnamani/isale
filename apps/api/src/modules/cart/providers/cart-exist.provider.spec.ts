import { Test, TestingModule } from '@nestjs/testing';
import { CartExistProvider } from './cart-exist.provider';

describe('CartExistProvider', () => {
  let provider: CartExistProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartExistProvider],
    }).compile();

    provider = module.get<CartExistProvider>(CartExistProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
