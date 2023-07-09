import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { PrismaService } from '../prisma/prisma.service';
import { AnimeFilterDto } from './dto/filter-anime.dto';
import { paginante } from '../utils';
import { Anime, Prisma } from '@prisma/client';

@Injectable()
export class AnimeService {
  private logger = new Logger(AnimeService.name);

  constructor(private prisma: PrismaService) {}

  async create(createAnimeDto: CreateAnimeDto) {
    this.logger.log('Saving author data...', createAnimeDto);

    const anime = await this.prisma.anime
      .create({
        data: {
          ...createAnimeDto,
        },
      })
      .catch((error) => {
        if (error.code === 'P2002') {
          throw new BadRequestException('Anime title already exists');
        }
        if (error.code === 'P2003') {
          throw new NotFoundException('Author or studio not found');
        }
        throw error;
      });
    this.logger.log('Anime saved');

    return anime;
  }

  async findAll(filter: AnimeFilterDto) {
    this.logger.log('Getting list of animes...', filter);

    const animes = await paginante<Anime, Prisma.AnimeFindManyArgs>(
      this.prisma.anime,
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
    return animes;
  }

  async findOne(id: string) {
    this.logger.log('Getting an anime by id...', { id });

    const anime = await this.prisma.anime
      .findUnique({
        where: {
          id,
        },
      })
      .catch((error) => {
        if (error.code === 'P2025') {
          throw new NotFoundException('Anime not found');
        }

        this.logger.error('Unexpected Error', error);
        throw error;
      });
    this.logger.log('Anime returned');
    return anime;
  }

  async update(id: string, updateAnimeDto: UpdateAnimeDto) {
    this.logger.log('Updating an anime...', { id, updateAnimeDto });
    const newAnime = await this.prisma.anime
      .update({
        where: {
          id,
        },
        data: {
          ...updateAnimeDto,
        },
      })
      .catch((error) => {
        if (error.code === 'P2025') {
          throw new NotFoundException('Anime not found');
        }
        this.logger.error('Unexpected Error', error);
        throw error;
      });

    this.logger.log('Anime updated');
    return newAnime;
  }

  async remove(id: string) {
    this.logger.log('Deleting an anime...', { id });
    await this.prisma.anime
      .delete({
        where: {
          id,
        },
      })
      .catch((error) => {
        if (error.code === 'P2025') {
          throw new NotFoundException('Anime not found');
        }

        this.logger.error('Unexpected Error', error);

        throw error;
      });
    this.logger.log('Anime deleted');
  }
}
