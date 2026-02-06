import morgan from 'morgan';
import logger from './logger.js';

// Custom Morgan format for clean, readable HTTP logs
morgan.token('status-color', (req, res) => {
  const status = res.statusCode;
  if (status >= 500) return '🔴';
  if (status >= 400) return '🟡';
  if (status >= 300) return '🔵';
  return '🟢';
});

// Custom format: METHOD /path STATUS RESPONSE_TIME IP
const customFormat = ':status-color :method :url | Status: :status | :response-time ms | IP: :remote-addr';

const morganMiddleware = morgan(customFormat, {
  stream: {
    write: (message) => {
      // Extract key info and log with logger
      const trimmed = message.trim();
      logger.info(trimmed, { type: 'http' });
    },
  },
});

export default morganMiddleware;