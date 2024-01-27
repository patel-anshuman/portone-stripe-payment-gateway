const winston = require('winston');
const { format } = winston;
const { combine, timestamp, printf } = format;

const logFormat = printf(({ timestamp, level, message }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const logger = winston.createLogger({
  format: combine(timestamp(), logFormat),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'log.txt' }),
  ],
});

const loggerMiddleware = (req, res, next) => {
  // Log request details
  logger.info(`Method: ${req.method}, Endpoint: ${req.originalUrl}, Type: Request, User: ${req.user || 'Guest'}`);
  next();
};

module.exports = { logger, loggerMiddleware };
