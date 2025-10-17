import { Body, Controller, Get, Post } from '@nestjs/common';
import { RomService } from './provider/rom.service';
import { AddRomDto } from './dto/create-rom.dto';
import { createRomDoc } from './doc/add-rom.doc';
import { ApiTags } from '@nestjs/swagger';
import { CreateGetDoc } from '@/shared/doc-response';

@ApiTags('rom')
@Controller('roms')
export class RomController {
  constructor(private readonly romService: RomService) {}

  @createRomDoc()
  @Post()
  addRom(@Body() addRomDto: AddRomDto) {
    return this.romService.addRom(addRomDto.size);
  }

  @CreateGetDoc('Get Roms', AddRomDto)
  @Get()
  getRams() {
    return this.romService.getAllRom();
  }
}
