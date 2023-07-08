import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CharacterFiltedDTO } from './dto/filter-character.dto';
import { PaginatedResult } from 'prisma-pagination';
import { Character, Prisma } from '@prisma/client';
import { paginante } from 'src/utils';

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
    return `This action returns a #${id} character`;
  }

  async update(id: string, updateCharacterDto: UpdateCharacterDto) {
    return `This action updates a #${id} character`;
  }

  async remove(id: string) {
    return `This action removes a #${id} character`;
  }
}
