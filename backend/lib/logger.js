import winston from 'winston';
import moment from 'moment';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Get current date for log filename
const today = moment().format('YYYY-MM-DD');

// Custom format for better readability
const customFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
    let log = `[${timestamp}] ${level.toUpperCase().padEnd(7)} | ${message}`;
    
    // Add metadata if present (excluding common fields)
    const metaKeys = Object.keys(meta).filter(key => 
      key !== 'timestamp' && key !== 'level' && key !== 'message'
    );
    if (metaKeys.length > 0) {
      log += ` | ${JSON.stringify(meta)}`;
    }
    
    // Add stack trace for errors
    if (stack) {
      log += `\n${stack}`;
    }
    
    return log;
  })
);

const logger = winston.createLogger({
  level: 'info',
  format: customFormat,
  transports: [
    // Error logs - date-wise
    new winston.transports.File({ 
      filename: path.join(logsDir, `error-${today}.log`), 
      level: 'error' 
    }),
    // Combined logs - date-wise
    new winston.transports.File({ 
      filename: path.join(logsDir, `combined-${today}.log`) 
    }),
    // Console output for development
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        customFormat
      )
    })
  ],
});

export default logger;