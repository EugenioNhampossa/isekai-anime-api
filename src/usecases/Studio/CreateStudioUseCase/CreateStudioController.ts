import { Request, Response } from "express";
import { CreateStudioUseCase } from "./CreateStudioUseCase";

export class CreateStudioController {
  private createStudioUseCase: CreateStudioUseCase;

  constructor(createStudioUseCase: CreateStudioUseCase) {
    this.createStudioUseCase = createStudioUseCase;
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const studio = await this.createStudioUseCase.execute({ name });
    return response.status(201).json(studio);
  }
}
