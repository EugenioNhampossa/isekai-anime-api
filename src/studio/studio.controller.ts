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
import { StudioService } from './studio.service';
import { AtGuard, RoleGuard } from 'src/common/guards';
import { Role } from 'src/common/enums';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Studio } from '@prisma/client';
import { StudioList } from './@types';
import { CreateStudioDto, FilterStudioDto, UpdateStudioDto } from './dto';

@Controller('studios')
export class StudioController {
  constructor(private readonly studioService: StudioService) {}

  @Post()
  @UseGuards(AtGuard, RoleGuard)
  @Roles(Role.Admin)
  create(@Body() createStudioDto: CreateStudioDto): Promise<Studio> {
    return this.studioService.create(createStudioDto);
  }

  @Patch(':id')
  @UseGuards(AtGuard, RoleGuard)
  @Roles(Role.Admin)
  update(
    @Param('id') id: string,
    @Body() updateStudioDto: UpdateStudioDto,
  ): Promise<Studio> {
    return this.studioService.update(id, updateStudioDto);
  }

  @Delete(':id')
  @UseGuards(AtGuard, RoleGuard)
  @Roles(Role.Admin)
  remove(@Param('id') id: string): Promise<void> {
    return this.studioService.remove(id);
  }

  @Get()
  findAll(@Query() filter: FilterStudioDto): Promise<StudioList> {
    return this.studioService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Studio> {
    return this.studioService.findOne(id);
  }
}
