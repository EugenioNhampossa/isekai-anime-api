import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CharacterFiltedDTO } from './dto/filter-character.dto';
import { PaginatedResult } from 'prisma-pagination';
import { Character, Prisma } from '@prisma/client';
import { paginante } from '../utils';

@Injectable()
export class CharacterService {
  private logger = new Logger(CharacterService.name);

  constructor(private prisma: PrismaService) {}

  async create(createCharacterDto: CreateCharacterDto) {
    this.logger.log('Saving author data...', createCharacterDto);

    const character = await this.prisma.character
      .create({
        data: {
          ...createCharacterDto,
        },
      })
      .catch((error) => {
        if (error.code === 'P2002') {
          this.logger.warn('Characters´s is already registered');
          throw new ForbiddenException('Characters´s name already exists');
        }
        this.logger.error('Unexpected Error', error);
        throw error;
      });

    this.logger.log('character saved');

    return character;
  }

  async findAll(
    filter: CharacterFiltedDTO,
  ): Promise<PaginatedResult<Character>> {
    this.logger.log('Getting list of authors...', filter);

    const characters = await paginante<Character, Prisma.CharacterFindManyArgs>(
      this.prisma.character,
      {
        where: {
          id_anime: filter.id_anime,
          name: {
            contains: filter.name,
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
    this.logger.log('Getting an character by id...', { id });

    const character = await this.prisma.character
      .findUnique({
        where: {
          id,
        },
      })
      .catch((error) => {
        if (error.code === 'P2025') {
          throw new NotFoundException('Character not found');
        }

        this.logger.error('Unexpected Error', error);
        throw error;
      });
    this.logger.log('Character returned');
    return character;
  }

  async update(id: string, updateCharacterDto: UpdateCharacterDto) {
    this.logger.log('Updating an character...', { id, updateCharacterDto });
    const newCharacter = await this.prisma.character
      .update({
        where: {
          id,
        },
        data: {
          ...updateCharacterDto,
        },
      })
      .catch((error) => {
        if (error.code === 'P2025') {
          throw new NotFoundException('Character not found');
        }
        this.logger.error('Unexpected Error', error);
        throw error;
      });

    this.logger.log('Character updated');
    return newCharacter;
  }

  async remove(id: string) {
    this.logger.log('Deleting an character...', { id });
    await this.prisma.character
      .delete({
        where: {
          id,
        },
      })
      .catch((error) => {
        if (error.code === 'P2025') {
          throw new NotFoundException('Character not found');
        }

        this.logger.error('Unexpected Error', error);

        throw error;
      });
    this.logger.log('Character deleted');
  }
}
