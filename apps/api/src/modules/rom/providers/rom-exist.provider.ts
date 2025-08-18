import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { Rom } from '../model/rom.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as SYS_MSG from '@/shared/system-message';

@Injectable()
export class RomExistProvider {
  constructor(
    @InjectRepository(Rom)
    private readonly romRepository: Repository<Rom>,
  ) {}

  async checkRamAlreadyExist(size: number) {
    try {
      const rom = await this.romRepository.findOne({
        where: {
          size,
        },
      });

      return rom;
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }

  async getRomEntities(rams: string[]) {
    try {
      return await this.romRepository.findBy({
        id: In(rams),
      });
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }
}
