import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { Author } from '@prisma/client';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums';
import { AtGuard, RoleGuard } from 'src/common/guards';
import { AuthorList } from './@types';
import { AuthorService } from './author.service';
import { AuthorFilterDto, CreateAuthorDto, UpdateAuthorDto } from './dto';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  @UseGuards(AtGuard, RoleGuard)
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.create(createAuthorDto);
  }

  @Patch(':id')
  @UseGuards(AtGuard, RoleGuard)
  @Roles(Role.Admin)
  update(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): Promise<Author> {
    return this.authorService.update(id, updateAuthorDto);
  }

  @Delete(':id')
  @UseGuards(AtGuard, RoleGuard)
  @Roles(Role.Admin)
  remove(@Param('id') id: string): Promise<void> {
    return this.authorService.remove(id);
  }

  @Get()
  findAll(@Query() filter: AuthorFilterDto): Promise<AuthorList> {
    return this.authorService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Author> {
    return this.authorService.findOne(id);
  }
}
