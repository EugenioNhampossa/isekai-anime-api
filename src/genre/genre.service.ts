import { ForbiddenException, Injectable } from '@nestjs/common';
import { Genre, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { paginante } from 'src/utils';
import { GenreList } from './@types/genre-list.type';
import { FilterGenreDto } from './dto';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Injectable()
export class GenreService {
  constructor(private prisma: PrismaService) {}

  async create(createGenreDto: CreateGenreDto): Promise<Genre> {
    return await this.prisma.genre
      .create({
        data: {
          ...createGenreDto,
        },
      })
      .catch((error) => {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Genre title already exists');
        }
        throw error;
      });
  }

  async findAll(filter: FilterGenreDto): Promise<GenreList> {
    return await paginante<Genre, Prisma.GenreFindManyArgs>(
      this.prisma.genre,
      {
        where: {
          title: {
            contains: filter.title,
          },
        },
      },
      { page: filter.page, perPage: filter.perPage },
    );
  }

  async findOne(id: string): Promise<Genre> {
    return await this.prisma.genre.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateGenreDto: UpdateGenreDto): Promise<Genre> {
    return await this.prisma.genre.update({
      where: {
        id,
      },
      data: {
        ...updateGenreDto,
      },
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.genre.delete({
      where: {
        id,
      },
    });
  }
}
