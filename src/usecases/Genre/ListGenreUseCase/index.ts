import { GenreRepository } from "../../../repositories/implementations/GenreRepository";
import { ListGenreController } from "./ListGenreController";
import { ListGenreUseCase } from "./ListGenreUseCase";

const genreRepository = new GenreRepository();

const listGenreUseCase = new ListGenreUseCase(genreRepository);

const listGenreController = new ListGenreController(listGenreUseCase);

export { listGenreController };
