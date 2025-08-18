import { Test, TestingModule } from '@nestjs/testing';
import { CategoryExistProvider } from './category-exist.provider';

describe('CategoryExistProvider', () => {
  let provider: CategoryExistProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryExistProvider],
    }).compile();

    provider = module.get<CategoryExistProvider>(CategoryExistProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
