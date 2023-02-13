import { Request, Response } from "express";
import { logger } from "../../../logger";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  private createUserUseCase: CreateUserUseCase;

  constructor(createUserUseCase: CreateUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const user = await this.createUserUseCase.execute({ email, password });
    logger.info("User created");
    return response.status(201).json(user);
  }
}
