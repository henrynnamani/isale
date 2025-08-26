import { Test, TestingModule } from '@nestjs/testing';
import { AddCartItemProvider } from './add-cart-item.provider';

describe('AddCartItemProvider', () => {
  let provider: AddCartItemProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddCartItemProvider],
    }).compile();

    provider = module.get<AddCartItemProvider>(AddCartItemProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
