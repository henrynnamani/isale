import { Test, TestingModule } from '@nestjs/testing';
import { CreateSubaccountProvider } from './create-subaccount.provider';

describe('CreateSubaccountProvider', () => {
  let provider: CreateSubaccountProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateSubaccountProvider],
    }).compile();

    provider = module.get<CreateSubaccountProvider>(CreateSubaccountProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
