import { GenreRepository } from "../../../repositories/implementations/GenreRepository";
import { CreateGenreController } from "./CreateGenreController";
import { CreateGenreUseCase } from "./CreateGenreUseCase";

const genreRepository = new GenreRepository();

const createGenreUseCase = new CreateGenreUseCase(genreRepository);

const createGenreController = new CreateGenreController(createGenreUseCase);

export { createGenreController };
