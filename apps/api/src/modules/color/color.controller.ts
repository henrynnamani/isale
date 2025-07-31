import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ColorService } from './provider/color.service';
import { CreateColorDto } from './dto/create-color.dto';
import { createColorDoc } from './doc/create-color.doc';
import { ApiTags } from '@nestjs/swagger';
import { deleteColorDoc } from './doc/delete-color.doc';

@ApiTags('color')
@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @createColorDoc()
  @Post()
  addColor(@Body() addColorDto: CreateColorDto) {
    return this.colorService.addColor(addColorDto);
  }

  @deleteColorDoc()
  @Delete(':id')
  deleteColor(@Param('id') colorId: string) {
    return this.colorService.deleteColor(colorId);
  }
}
