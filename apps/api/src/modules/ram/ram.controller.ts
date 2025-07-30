import { Controller, Post } from '@nestjs/common';
import { RamService } from './provider/ram.service';

@Controller('ram')
export class RamController {
  constructor(private readonly ramService: RamService) {}

  @Post()
  addRam() {}
}
