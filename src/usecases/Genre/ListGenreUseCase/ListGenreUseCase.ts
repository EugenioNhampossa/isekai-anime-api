import {
  IGenreData,
  IGenreRepository,
} from "../../../repositories/IGenreRepository";
import { ListGenreRequestDTO } from "./ListGenreDTO";

export class ListGenreUseCase {
  private genreRepository: IGenreRepository;

  constructor(genreRepository: IGenreRepository) {
    this.genreRepository = genreRepository;
  }

  async execute(data: ListGenreRequestDTO): Promise<IGenreData> {
    return this.genreRepository.findAll(data);
  }
}
