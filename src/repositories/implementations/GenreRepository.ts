import { Genre } from "../../entities/Genre";
import { prisma } from "../../prisma";
import { IGenreRepository } from "../IGenreRepository";

export class GenreRepository implements IGenreRepository {
  async create(genre: Genre): Promise<Genre> {
    return prisma.genre.create({
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
  async findAll(): Promise<Genre[]> {
    throw new Error("Method not implemented.");
  }
}
