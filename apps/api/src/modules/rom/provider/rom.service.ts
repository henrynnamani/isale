import {
  BadRequestException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { RomExistProvider } from '../providers/rom-exist.provider';
import { InjectRepository } from '@nestjs/typeorm';
import { Rom } from '../model/rom.entity';
import { Repository } from 'typeorm';
import * as SYS_MSG from '@/shared/system-message';

@Injectable()
export class RomService {
  constructor(
    @InjectRepository(Rom)
    private readonly romRepository: Repository<Rom>,
    private readonly romExistProvider: RomExistProvider,
  ) {}
  async addRom(size: number) {
    const rom = await this.romExistProvider.checkRamAlreadyExist(size);

    if (rom) {
      throw new BadRequestException(SYS_MSG.ROM_ALREADY_EXIST);
    }

    try {
      const ram = this.romRepository.create({ size: size });

      await this.romRepository.save(ram);

      return {
        data: ram,
        message: SYS_MSG.ROM_CREATED_SUCCESSFULLY,
      };
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }

  async getAllRom() {
    try {
      const roms = await this.romRepository.find();

      return roms;
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }
}
