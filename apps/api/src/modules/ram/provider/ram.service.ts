import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Ram } from '../model/ram.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RamExistProvider } from '../providers/ram-exist.provider';
import * as SYS_MSG from '@/shared/system-message';

@Injectable()
export class RamService {
  constructor(
    private readonly ramExist: RamExistProvider,
    @InjectRepository(Ram)
    private readonly ramRepository: Repository<Ram>,
  ) {}

  async addRam(size: number) {
    await this.ramExist.checkRamAlreadyExist(size);

    try {
      const ram = this.ramRepository.create({ size: size });

      await this.ramRepository.save(ram);

      return {
        data: ram,
        message: SYS_MSG.RAM_CREATED_SUCCESSFULLY,
      };
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }
}
