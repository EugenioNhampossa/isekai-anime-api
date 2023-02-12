import { createLogger, format, transports} from "winston";
const { combine, timestamp,  printf, prettyPrint, colorize, cli } = format;

const logFormat = printf(({ level, message,  timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(
    timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    logFormat,
    prettyPrint(),
    colorize({all:true})
  ),
  transports: [new transports.Console()],
});


export { logger };
