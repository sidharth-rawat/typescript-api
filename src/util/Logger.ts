import winston from 'winston';

const logFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

const logPath = (fileName: string): string => (
  `logs/${fileName}.log`
)

export const logger = winston.createLogger({
  exceptionHandlers: [
    new winston.transports.File({ 
      filename: logPath('exception'),
      level: 'warn',
      format: logFormat 
    }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ 
      filename: logPath('rejections'), 
      level: 'warn',
      format: logFormat 
    }),
  ],
  transports: [
    new winston.transports.Console({
      level: 'info',
      format: winston.format.cli()
    }),
    new winston.transports.File({
      filename: logPath('combined'),
      level: 'warn',
      format: logFormat
    }),
  ]
});
