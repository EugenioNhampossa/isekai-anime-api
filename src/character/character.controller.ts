import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { AtGuard, RoleGuard } from '../common/guards';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums';
import { CharacterFiltedDTO } from './dto/filter-character.dto';

@Controller('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  @UseGuards(AtGuard, RoleGuard)
  @Roles(Role.Admin)
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.characterService.create(createCharacterDto);
  }

  @Patch(':id')
  @UseGuards(AtGuard, RoleGuard)
  @Roles(Role.Admin)
  update(
    @Param('id') id: string,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ) {
    return this.characterService.update(id, updateCharacterDto);
  }

  @Delete(':id')
  @UseGuards(AtGuard, RoleGuard)
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.characterService.remove(id);
  }

  @Get()
  findAll(@Query() filter: CharacterFiltedDTO) {
    return this.characterService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.characterService.findOne(id);
  }
}
