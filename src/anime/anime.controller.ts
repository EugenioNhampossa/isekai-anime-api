import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AnimeService } from './anime.service';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { AnimeFilterDto } from './dto/filter-anime.dto';
import { AtGuard, RoleGuard } from '../common/guards';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums';

@Controller('animes')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @Post()
  @UseGuards(AtGuard, RoleGuard)
  @Roles(Role.Admin)
  create(@Body() createAnimeDto: CreateAnimeDto) {
    return this.animeService.create(createAnimeDto);
  }

  @Patch(':id')
  @UseGuards(AtGuard, RoleGuard)
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateAnimeDto: UpdateAnimeDto) {
    return this.animeService.update(id, updateAnimeDto);
  }

  @Delete(':id')
  @UseGuards(AtGuard, RoleGuard)
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.animeService.remove(id);
  }

  @Get()
  findAll(@Query() filter: AnimeFilterDto) {
    return this.animeService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animeService.findOne(id);
  }
}
