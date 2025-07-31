import { Body, Controller, Post } from '@nestjs/common';
import { RomService } from './provider/rom.service';
import { AddRomDto } from './dto/create-rom.dto';
import { createRomDoc } from './doc/add-rom.doc';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('rom')
@Controller('rom')
export class RomController {
  constructor(private readonly romService: RomService) {}

  @createRomDoc()
  @Post()
  addRom(@Body() addRomDto: AddRomDto) {
    return this.romService.addRom(addRomDto.size);
  }
}
