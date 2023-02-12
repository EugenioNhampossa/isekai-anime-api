import { Router } from "express";
import { logger } from "./logger";
import { createGenreController } from "./usecases/Genre/CreateGenreUseCase";
const router = Router();

//GENRE

router.post("/genres", (req, res) => {
  logger.info("Crating genre", {
    hostname: req.hostname,
    data: req.body,
    withToken: !!req.headers.authorization,
  });
  return createGenreController.handle(req, res);
});

export { router };
