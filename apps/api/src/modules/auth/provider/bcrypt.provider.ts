import { HashingProvider } from './hashing.provider';
import * as bcrypt from 'bcryptjs';

export class BcryptProvider extends HashingProvider {
  async compare(data: string, encrypted: string) {
    return bcrypt.compare(data, encrypted);
  }

  async hashPassword(data: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);

    return await bcrypt.hash(data, salt);
  }
}
