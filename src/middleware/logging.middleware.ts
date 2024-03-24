import { Request, Response, NextFunction } from 'express';
import * as path from 'path';
import * as winston from 'winston';
// import * as util from 'util';
import DailyRotateFile = require('winston-daily-rotate-file');

const logDirectory = path.join(process.cwd(), 'logs');
const env = process.env.NODE_ENV || 'development';
const level = env === 'development' ? 'debug' : 'info';

const logger = winston.createLogger({
  level,
  format: winston.format.combine(
    winston.format.timestamp({
      format:
        new Date().getTimezoneOffset() / 60 === 8
          ? 'YYYY-MM-DD HH:mm:ss Z'
          : 'YYYY-MM-DD HH:mm:ss [GMT]Z',
    }),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
    new DailyRotateFile({
      filename: path.join(logDirectory, `${env}-http-%DATE%.log`),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

export const loggingMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const { method, originalUrl } = req;
  // const headers = util.inspect(req.headers, { depth: Infinity });
  // const body = JSON.stringify(req.body);
  // const body = util.inspect(req.body, { depth: Infinity });
  logger.info({ message: `${method} ${originalUrl}` });
  // logger.info({ message: headers });
  // logger.info({ message: body });

  next();
};

export { logger };
