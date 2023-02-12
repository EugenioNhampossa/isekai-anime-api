import { Genre } from "../entities/Genre";

export interface IGenreRepository {
  create(genre: Genre): Promise<Genre>;
  delete(id: string): Promise<void>;
  update(genre: Genre): Promise<void>;
  findUnique(id: string): Promise<Genre>;
  findAll(): Promise<Genre[]>;
}
