import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma, Studio } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { paginante } from 'src/utils';
import { StudioList } from './@types';
import { CreateStudioDto, FilterStudioDto, UpdateStudioDto } from './dto';

@Injectable()
export class StudioService {
  constructor(private prisma: PrismaService) {}

  async create(createStudioDto: CreateStudioDto): Promise<Studio> {
    return await this.prisma.studio
      .create({
        data: {
          ...createStudioDto,
        },
      })
      .catch((error) => {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Name of the author already exists');
        }
        throw error;
      });
  }

  async findAll(filter: FilterStudioDto): Promise<StudioList> {
    return await paginante<Studio, Prisma.StudioFindManyArgs>(
      this.prisma.studio,
      {
        where: {
          name: {
            contains: filter.name,
          },
        },
      },
      { page: filter.page, perPage: filter.perPage },
    );
  }

  async findOne(id: string): Promise<Studio> {
    return await this.prisma.studio.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateStudioDto: UpdateStudioDto): Promise<Studio> {
    return await this.prisma.studio.update({
      where: {
        id,
      },
      data: {
        ...updateStudioDto,
      },
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.studio.delete({
      where: {
        id,
      },
    });
  }
}
