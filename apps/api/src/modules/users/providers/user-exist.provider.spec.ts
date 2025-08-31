import { Test, TestingModule } from '@nestjs/testing';
import { UserExistProvider } from './user-exist.provider';

describe('UserExistProvider', () => {
  let provider: UserExistProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserExistProvider],
    }).compile();

    provider = module.get<UserExistProvider>(UserExistProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
