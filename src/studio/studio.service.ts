import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { Prisma, Studio } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { paginante } from '../utils';
import { StudioList } from './@types';
import { CreateStudioDto, FilterStudioDto, UpdateStudioDto } from './dto';

@Injectable()
export class StudioService {
  logger = new Logger(StudioService.name);

  constructor(private prisma: PrismaService) {}

  async create(createStudioDto: CreateStudioDto): Promise<Studio> {
    this.logger.log('Saving studio data...', createStudioDto);
    const studio = await this.prisma.studio
      .create({
        data: {
          ...createStudioDto,
        },
      })
      .catch((error) => {
        if (error.code === 'P2002') {
          this.logger.warn('Name of the studio already exists');
          throw new ForbiddenException('Name of the studio already exists');
        }
        this.logger.error('Unexpected error', error);
        throw error;
      });

    this.logger.log('Studio Saved');

    return studio;
  }

  async findAll(filter: FilterStudioDto): Promise<StudioList> {
    this.logger.log('Gettitng studio list...', filter);

    const studioList = await paginante<Studio, Prisma.StudioFindManyArgs>(
      this.prisma.studio,
      {
        where: {
          name: {
            contains: filter.name,
          },
        },
      },
      { page: filter.page, perPage: filter.perPage },
    ).catch((error) => {
      this.logger.error('Unexpected error', error);
      throw error;
    });
    this.logger.log('List returned');
    return studioList;
  }

  async findOne(id: string): Promise<Studio> {
    this.logger.log('Getting studio by id...', { id });
    const studio = await this.prisma.studio
      .findUnique({
        where: {
          id,
        },
      })
      .catch((error) => {
        this.logger.error('Unexpected error', error);
        throw error;
      });
    this.logger.log('Studio returned');
    return studio;
  }

  async update(id: string, updateStudioDto: UpdateStudioDto): Promise<Studio> {
    this.logger.log('Updating studio...', { id, updateStudioDto });
    const studio = await this.prisma.studio
      .update({
        where: {
          id,
        },
        data: {
          ...updateStudioDto,
        },
      })
      .catch((error) => {
        this.logger.error('Unexpected error', error);

        throw error;
      });
    this.logger.log('Studio updated');

    return studio;
  }

  async remove(id: string): Promise<void> {
    this.logger.log('Deleting studio...', { id });

    await this.prisma.studio
      .delete({
        where: {
          id,
        },
      })
      .catch((error) => {
        this.logger.error('Unexpected error', error);

        throw error;
      });
    this.logger.log('Studio deleted');
  }
}
