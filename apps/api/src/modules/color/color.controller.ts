import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ColorService } from './provider/color.service';
import { CreateColorDto } from './dto/create-color.dto';
import { ApiTags } from '@nestjs/swagger';
import { deleteColorDoc } from './doc/delete-color.doc';
import { CreateDoc, CreateGetDoc } from '@/shared/doc-response';
import { DeleteColorDto } from './dto/delete-color.dto';

@ApiTags('color')
@Controller('colors')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Post()
  @CreateDoc('Create color', CreateColorDto)
  addColor(@Body() addColorDto: CreateColorDto) {
    return this.colorService.addColor(addColorDto);
  }

  @deleteColorDoc()
  @Delete(':id')
  @CreateDoc('Delete color', DeleteColorDto)
  deleteColor(@Param() deleteColorDto: DeleteColorDto) {
    return this.colorService.deleteColor(deleteColorDto.id);
  }

  @Get()
  @CreateGetDoc('Get colors', CreateColorDto)
  getColors() {
    return this.colorService.getAllColor();
  }
}
