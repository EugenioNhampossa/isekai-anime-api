import { app } from "./app";
import { logger } from "./logger";

app.listen(process.env.PORT || 3333, () =>
    logger.info("Server running 🚀")
);
