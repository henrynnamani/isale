import { Body, Controller, Get, Post } from '@nestjs/common';
import { RamService } from './provider/ram.service';
import { AddRamDto } from './dto/create-ram.dto';
import { createRamDoc } from './doc/create-ram.doc';
import { ApiTags } from '@nestjs/swagger';
import { CreateGetDoc } from '@/shared/doc-response';

@ApiTags('ram')
@Controller('rams')
export class RamController {
  constructor(private readonly ramService: RamService) {}

  @createRamDoc()
  @Post()
  addRam(@Body() addRamDto: AddRamDto) {
    return this.ramService.addRam(addRamDto.size);
  }

  @CreateGetDoc('Get Rams', AddRamDto)
  @Get()
  getRams() {
    return this.ramService.getAllRam();
  }
}
