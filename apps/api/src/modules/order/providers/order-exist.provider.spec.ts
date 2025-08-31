import { Test, TestingModule } from '@nestjs/testing';
import { OrderExistProvider } from './order-exist.provider';

describe('OrderExistProvider', () => {
  let provider: OrderExistProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderExistProvider],
    }).compile();

    provider = module.get<OrderExistProvider>(OrderExistProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
