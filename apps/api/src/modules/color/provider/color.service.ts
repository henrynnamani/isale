import {
  BadRequestException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateColorDto } from '../dto/create-color.dto';
import { ColorExistProvider } from '../providers/color-exist.provider';
import { InjectRepository } from '@nestjs/typeorm';
import { Color } from '../model/color.entity';
import { Repository } from 'typeorm';
import * as SYS_MSG from '@/shared/system-message';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
    private readonly colorExistProvider: ColorExistProvider,
  ) {}

  async addColor(addColorDto: CreateColorDto) {
    const color = await this.colorExistProvider.checkColorExist(
      addColorDto.name,
      addColorDto.hex,
    );

    if (color) {
      throw new BadRequestException(SYS_MSG.COLOR_ALREADY_EXIST(color.name));
    }

    try {
      const color = this.colorRepository.create(addColorDto);

      await this.colorRepository.save(color);

      return {
        data: color,
        message: SYS_MSG.COLOR_CREATED_SUCCESSFULLY,
      };
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }

  async deleteColor(id: string) {
    const color = await this.colorExistProvider.checkColorExistById(id);

    if (!color) {
      throw new NotFoundException(SYS_MSG.COLOR_NOT_FOUND);
    }

    try {
      await this.colorRepository.delete({
        id,
      });

      return {
        data: color,
        message: SYS_MSG.COLOR_DELETED_SUCCESSFULLY,
      };
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }

  async getAllColor() {
    try {
      const colors = await this.colorRepository.find();

      return colors;
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }
}
