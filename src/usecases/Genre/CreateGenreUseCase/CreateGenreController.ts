import { Request, Response } from "express";
import { logger } from "../../../logger";
import { CreateGenreUseCase } from "./CreateGenreUseCase";

export class CreateGenreController {
  private createGenreUseCase: CreateGenreUseCase;

  constructor(createGenreUseCase: CreateGenreUseCase) {
    this.createGenreUseCase = createGenreUseCase;
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { title, description } = request.body;
    const genre = await this.createGenreUseCase.execute({
      title,
      description,
    });
    logger.info("Genre created");
    return response.status(201).json(genre);
  }
}
