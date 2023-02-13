import { IGenreFilter } from "../@types/IGenreFilter";
import { IMetaProps } from "../@types/IMetaProps";
import { Genre } from "../entities/Genre";

export interface IGenreData {
  data: Genre[];
  meta: IMetaProps;
}

export interface IGenreRepository {
  create(genre: Genre): Promise<Genre>;
  delete(id: string): Promise<void>;
  update(genre: Genre): Promise<void>;
  findUnique(id: string): Promise<Genre>;
  findAll(filter: IGenreFilter): Promise<IGenreData>;
}
