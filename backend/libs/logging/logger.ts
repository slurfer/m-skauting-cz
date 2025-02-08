import winston, { format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const jsonReadableFormat = format.combine(
    format.printf((info) => {
        console.log;
        if (typeof info.message === 'object') {
            info.message = `\n${JSON.stringify(info.message, null, 3)}`;
        }

        return info.message;
    }),
    format.colorize(),
    format.simple()
);

const consoleTransport = new winston.transports.Console({
    format: winston.format.combine(winston.format.colorize(), jsonReadableFormat),
});

const timeStampFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${JSON.stringify(message)}`;
});

const dailyRotateFileTransportCombined = new DailyRotateFile({
    filename: './logs/combined/combined-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(winston.format.timestamp(), timeStampFormat),
});

const dailyRotateFileTransportError = new DailyRotateFile({
    filename: './logs/errors/errors-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    level: 'warn',
    format: winston.format.combine(winston.format.timestamp(), winston.format.simple()),
});

const logger = winston.createLogger({
    level: 'silly',
    format: format.combine(format.errors({ stack: true }), format.json()),
    transports: [consoleTransport, dailyRotateFileTransportCombined, dailyRotateFileTransportError],
    exceptionHandlers: [consoleTransport, dailyRotateFileTransportError],
    rejectionHandlers: [consoleTransport, dailyRotateFileTransportError],
    exitOnError: true,
});

export default logger;
