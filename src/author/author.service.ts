import { ForbiddenException, Injectable } from '@nestjs/common';
import { Author, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { paginante } from 'src/utils';
import { AuthorList } from './@types';
import { AuthorFilterDto, CreateAuthorDto, UpdateAuthorDto } from './dto';

@Injectable()
export class AuthorService {
  constructor(private prisma: PrismaService) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    return await this.prisma.author
      .create({
        data: {
          ...createAuthorDto,
        },
      })
      .catch((error) => {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Author name already exists');
        }
        throw error;
      });
  }

  async findAll(filter: AuthorFilterDto): Promise<AuthorList> {
    return await paginante<Author, Prisma.AuthorFindManyArgs>(
      this.prisma.author,
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

  async findOne(id: string): Promise<Author> {
    return await this.prisma.author.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    return await this.prisma.author.update({
      where: {
        id,
      },
      data: {
        ...updateAuthorDto,
      },
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.author.delete({
      where: {
        id,
      },
    });
  }
}
