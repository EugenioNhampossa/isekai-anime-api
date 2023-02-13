import { Request, Response } from "express";
import { User } from "../../../entities/User";
import { logger } from "../../../logger";
import { AuthUseCase } from "./AuthUseCase";

export class AuthController {
  private authUseCase: AuthUseCase;

  constructor(authUseCase: AuthUseCase) {
    this.authUseCase = authUseCase;
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const token = await this.authUseCase.execute({ email, password });

    logger.info("User authenticated");
    return response.status(200).json(token);
  }
}
