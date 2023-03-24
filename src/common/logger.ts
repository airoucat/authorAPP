//尝试使用winston记录日志，没弄明白

import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

const customFormat = format.combine(
  format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
  format.align(),
  format.printf((i) =>
    i.level === 'info' ? `${i.level}: ${i.timestamp} ${i.message}` : '',
  ),
);

const consoleInfoFormat = format.combine(
  format.printf((i) =>
    i.level === 'info' ? `${i.level}: ${i.timestamp} ${i.message}` : '',
  ),
);

const defaultOptions = {
  format: customFormat,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
};

const globalLogger = {
  format: customFormat,
  transports: [
    new transports.Console({
      level: 'info',
      format: consoleInfoFormat,
    }),
    new transports.DailyRotateFile({
      filename: 'logs/info.log',
      level: 'info',
      format: consoleInfoFormat,
      ...defaultOptions,
    }),
    new transports.DailyRotateFile({
      filename: 'logs/error.log',
      level: 'error',
      ...defaultOptions,
    }),
  ],
};

export { globalLogger };
// module.exports = globalLogger;
