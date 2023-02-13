import "express-async-errors";

import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { router } from "./routes";
import { logger } from "./logger";

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    logger.error(error.message);
    return response.status(400).json({
      message: error.message || "Unexpected Error",
    });
  }
);

export { app };
