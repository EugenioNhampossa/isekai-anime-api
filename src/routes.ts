import { Router } from "express";
import { logger } from "./logger";
import { createGenreController } from "./usecases/Genre/CreateGenreUseCase";
import { createUserController } from "./usecases/User/CreateUserUseCase";
const router = Router();

//USER========================
router.post("/users", (req, res) => {
  logger.info("Crating user", {
    hostname: req.hostname,
    data: { email: req.body.email },
    withToken: !!req.headers.authorization,
  });
  return createUserController.handle(req, res);
});

//GENRE========================
router.post("/genres", (req, res) => {
  logger.info("Crating genre", {
    hostname: req.hostname,
    data: req.body,
    withToken: !!req.headers.authorization,
  });
  return createGenreController.handle(req, res);
});

export { router };
