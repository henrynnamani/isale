import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ram } from '../model/ram.entity';
import { Repository } from 'typeorm';
import * as SYS_MSG from '@/shared/system-message';

@Injectable()
export class RamExistProvider {
  constructor(
    @InjectRepository(Ram)
    private readonly ramRepository: Repository<Ram>,
  ) {}

  async checkRamAlreadyExist(size: number) {
    try {
      const ram = await this.ramRepository.findOne({
        where: {
          size,
        },
      });

      return ram;
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }
}
