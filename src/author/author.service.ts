import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { Author, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { paginante } from 'src/utils';
import { AuthorList } from './@types';
import { AuthorFilterDto, CreateAuthorDto, UpdateAuthorDto } from './dto';

@Injectable()
export class AuthorService {
  private logger = new Logger(AuthorService.name);

  constructor(private prisma: PrismaService) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    this.logger.log('Saving author data...', createAuthorDto);

    const author = await this.prisma.author
      .create({
        data: {
          ...createAuthorDto,
        },
      })
      .catch((error) => {
        if (error.code === 'P2002') {
          this.logger.warn('Author is already registered');
          throw new ForbiddenException('Author´s name already exists');
        }
        this.logger.error('Unexpected Error', error);
        throw error;
      });

    this.logger.log('Author saved');

    return author;
  }

  async findAll(filter: AuthorFilterDto): Promise<AuthorList> {
    this.logger.log('Getting list of authors...', filter);

    const authorList = await paginante<Author, Prisma.AuthorFindManyArgs>(
      this.prisma.author,
      {
        where: {
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
    return authorList;
  }

  async findOne(id: string): Promise<Author> {
    this.logger.log('Getting an author by id...', { id });

    const author = await this.prisma.author
      .findUnique({
        where: {
          id,
        },
      })
      .catch((error) => {
        this.logger.error('Unexpected Error', error);

        throw error;
      });
    this.logger.log('Author returned');
    return author;
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    this.logger.log('Updating an author...', { id, updateAuthorDto });
    const newAuthor = await this.prisma.author
      .update({
        where: {
          id,
        },
        data: {
          ...updateAuthorDto,
        },
      })
      .catch((error) => {
        this.logger.error('Unexpected Error', error);

        throw error;
      });

    this.logger.log('Author updated');

    return newAuthor;
  }

  async remove(id: string): Promise<void> {
    this.logger.log('Deleting an author...', { id });
    await this.prisma.author
      .delete({
        where: {
          id,
        },
      })
      .catch((error) => {
        this.logger.error('Unexpected Error', error);

        throw error;
      });
    this.logger.log('Author deleted');
  }
}
