import { Test, TestingModule } from '@nestjs/testing';
import { VendorExistProvider } from './vendor-exist.provider';

describe('VendorExistProvider', () => {
  let provider: VendorExistProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VendorExistProvider],
    }).compile();

    provider = module.get<VendorExistProvider>(VendorExistProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
