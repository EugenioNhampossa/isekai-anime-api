import { Request, Response } from "express";
import { logger } from "../../../logger";
import { ListGenreUseCase } from "./ListGenreUseCase";

export class ListGenreController {
  private listGenreUseCase: ListGenreUseCase;

  constructor(listGenreUseCase: ListGenreUseCase) {
    this.listGenreUseCase = listGenreUseCase;
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const page = parseInt(request.query.page?.toString()) | 1;
    const perPage = parseInt(request.query.perPage?.toString()) | 20;
    const { title }: any = request.query;

    const genreList = await this.listGenreUseCase.execute({
      page,
      perPage,
      title,
    });

    logger.info("List retrieved");
    return response.status(200).json(genreList);
  }
}
