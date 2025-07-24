export abstract class HashingProvider {
  abstract compare(data: string, encrypted: string | Buffer): Promise<boolean>;

  abstract hashPassword(data: string): Promise<string>;
}
