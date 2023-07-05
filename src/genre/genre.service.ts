import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { Genre, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { paginante } from '../utils';
import { GenreList } from './@types/genre-list.type';
import { FilterGenreDto } from './dto';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Injectable()
export class GenreService {
  private logger = new Logger(GenreService.name);

  constructor(private prisma: PrismaService) {}

  async create(createGenreDto: CreateGenreDto): Promise<Genre> {
    this.logger.log('Saving genre data...', createGenreDto);

    const genre = await this.prisma.genre
      .create({
        data: {
          ...createGenreDto,
        },
      })
      .catch((error) => {
        if (error.code === 'P2002') {
          this.logger.warn('Genre title already exists');
          throw new ForbiddenException('Genre title already exists');
        }
        this.logger.error('Unexpected Error', error);

        throw error;
      });
    this.logger.log('Genre saved');
    return genre;
  }

  async findAll(filter: FilterGenreDto): Promise<GenreList> {
    this.logger.log('Getting list of genres...', filter);

    const genreList = await paginante<Genre, Prisma.GenreFindManyArgs>(
      this.prisma.genre,
      {
        where: {
          title: {
            contains: filter.title,
          },
        },
      },
      { page: filter.page, perPage: filter.perPage },
    ).catch((error) => {
      this.logger.error('Unexpected Error', error);

      throw error;
    });

    this.logger.log('List returned');

    return genreList;
  }

  async findOne(id: string): Promise<Genre> {
    this.logger.log('Getting a genre by id...', { id });
    const genre = await this.prisma.genre
      .findUnique({
        where: {
          id,
        },
      })
      .catch((error) => {
        this.logger.error('Unexpected Error', error);

        throw error;
      });

    this.logger.log('Genre Returned');
    return genre;
  }

  async update(id: string, updateGenreDto: UpdateGenreDto): Promise<Genre> {
    this.logger.log('Updating a genre...', { id });

    const newGenre = await this.prisma.genre
      .update({
        where: {
          id,
        },
        data: {
          ...updateGenreDto,
        },
      })
      .catch((error) => {
        this.logger.error('Unexpected Error', error);

        throw error;
      });
    this.logger.log('Genre Updated');

    return newGenre;
  }

  async remove(id: string): Promise<void> {
    this.logger.log('Deleting a genre...', { id });

    await this.prisma.genre
      .delete({
        where: {
          id,
        },
      })
      .catch((error) => {
        this.logger.error('Unexpected Error', error);

        throw error;
      });

    this.logger.log('Genre deleted');
  }
}
