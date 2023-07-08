import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AnimeFilterDto } from './dto/filter-anime.dto';
import { paginante } from 'src/utils';
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

    const characters = await paginante<Anime, Prisma.AnimeFindManyArgs>(
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
    return characters;
  }

  async findOne(id: string) {
    return `This action returns a #${id} anime`;
  }

  async update(id: string, updateAnimeDto: UpdateAnimeDto) {
    return `This action updates a #${id} anime`;
  }

  async remove(id: string) {
    return `This action removes a #${id} anime`;
  }
}
