import { Router } from "express";
import { logger } from "./logger";
import { createGenreController } from "./usecases/Genre/CreateGenreUseCase";
import { listGenreController } from "./usecases/Genre/ListGenreUseCase";
import { createStudioController } from "./usecases/Studio/CreateStudioUseCase";
import { authController } from "./usecases/User/AuthenticateUserUseCase.ts";
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

router.post("/login", (req, res) => {
  logger.info("Login", {
    hostname: req.hostname,
    data: { email: req.body.email },
  });
  return authController.handle(req, res);
});

//GENRE========================
router.post("/genres", (req, res) => {
  logger.info("Crate genre", {
    hostname: req.hostname,
    data: req.body,
    withToken: !!req.headers.authorization,
  });
  return createGenreController.handle(req, res);
});

router.get("/genres", (req, res) => {
  logger.info("List of genres", {
    hostname: req.hostname,
    query: req.query,
  });
  return listGenreController.handle(req, res);
});

//STUDIO=============================
router.post("/studios", (req, res) => {
  logger.info("Crate studio", {
    hostname: req.hostname,
    data: req.body,
    withToken: !!req.headers.authorization,
  });
  return createStudioController.handle(req, res);
});

export { router };
