import { Prisma } from "@prisma/client";
import { createPaginator } from "prisma-pagination";
import { IGenreFilter } from "../../@types/IGenreFilter";
import { Genre } from "../../entities/Genre";
import { prisma } from "../../prisma";
import { IGenreData, IGenreRepository } from "../IGenreRepository";

export class GenreRepository implements IGenreRepository {
  async findAll(filter: IGenreFilter): Promise<IGenreData> {
    const { page, perPage, title } = filter;
    const paginate = createPaginator({ page, perPage });
    return await paginate<Genre, Prisma.GenreFindManyArgs>(prisma.genre, {
      where: {
        title: {
          contains: title,
          mode: "insensitive",
        },
      },
      include: {
        _count: {
          select: { Anime: true },
        },
      },
    });
  }

  async create(genre: Genre): Promise<Genre> {
    return await prisma.genre.create({
      data: {
        id: genre.id,
        title: genre.title,
        description: genre.description,
      },
    });
  }
  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async update(genre: Genre): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async findUnique(id: string): Promise<Genre> {
    throw new Error("Method not implemented.");
  }
}
