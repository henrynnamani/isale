import { Body, Controller, Post } from '@nestjs/common';
import { RamService } from './provider/ram.service';
import { AddRamDto } from './dto/create-ram.dto';
import { createRamDoc } from './doc/create-ram.doc';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ram')
@Controller('ram')
export class RamController {
  constructor(private readonly ramService: RamService) {}

  @createRamDoc()
  @Post()
  addRam(@Body() addRamDto: AddRamDto) {
    return this.ramService.addRam(addRamDto.size);
  }
}
