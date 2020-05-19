import * as winston from 'winston';
import path from 'path';

winston.addColors({
  error: 'red bold',
  warn: 'yellow',
  info: 'cyan',
  debug: 'green',
});
const createLogger = (basePath: string, service: string) => {
  const colorizer = winston.format.colorize();

  const transports: any[] = [];

  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.splat(),
      winston.format.timestamp(),
      winston.format.printf(info => {
        const { err, error, timestamp, level, message, ...args } = info;
        return `${timestamp}|[${level}]|${service}|${message.trim()}${
          Object.keys(args).length ? '|' + JSON.stringify(args) : ''
        }`;
      }),
    ),
    transports,
  });

  logger.add(
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.simple(),
        winston.format.printf(info => {
          const { err, error, timestamp, level, message, ...args } = info;
          return colorizer.colorize(
            level,
            `${timestamp}` +
              `[${level}]`.padEnd(7) +
              `|${service.padEnd(16)}|${message}|${
                Object.keys(args).length ? JSON.stringify(args) : ''
              }`,
          );
        }),
      ),
    }),
  );
  return logger;
};

const logsPath = path.join(__dirname, '..', '..');

export const logger = createLogger(logsPath, 'APP_NAME');
