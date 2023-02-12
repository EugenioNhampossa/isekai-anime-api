import { Genre } from "../../../entities/Genre";
import { IGenreRepository } from "../../../repositories/IGenreRepository";
import { ICreateGenreRequestDTO } from "./CreateGenreDTO";

export class CreateGenreUseCase {
  private genreRepository: IGenreRepository;

  constructor(genreRepository: IGenreRepository) {
    this.genreRepository = genreRepository;
  }

  async execute(data: ICreateGenreRequestDTO): Promise<Genre> {
    const genre = new Genre(data);
    return await this.genreRepository.create(genre);
  }
}
