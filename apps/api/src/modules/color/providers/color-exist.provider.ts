import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Color } from '../model/color.entity';
import { In, Repository } from 'typeorm';
import * as SYS_MSG from '@/shared/system-message';

@Injectable()
export class ColorExistProvider {
  constructor(
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
  ) {}

  async checkColorExist(name: string, hex: string) {
    try {
      const exist = await this.colorRepository.findOne({
        where: [{ name: name }, { hex: hex }],
      });

      return exist;
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }

  async checkColorExistById(id: string) {
    try {
      const exist = await this.colorRepository.findOne({
        where: {
          id: id,
        },
      });

      return exist;
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }

  async getColorEntities(colors: string[]) {
    try {
      return await this.colorRepository.findBy({
        id: In(colors),
      });
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }
}
