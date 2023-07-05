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
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { AtGuard, RoleGuard } from '../common/guards';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums';
import { FilterGenreDto, CreateGenreDto, UpdateGenreDto } from './dto';

@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  @UseGuards(AtGuard, RoleGuard)
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genreService.create(createGenreDto);
  }

  @Patch(':id')
  @UseGuards(AtGuard, RoleGuard)
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
    return this.genreService.update(id, updateGenreDto);
  }

  @Delete(':id')
  @UseGuards(AtGuard, RoleGuard)
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.genreService.remove(id);
  }

  @Get()
  findAll(@Query() filter: FilterGenreDto) {
    return this.genreService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genreService.findOne(id);
  }
}
