import { logger } from '../helpers/logger';

export const connectToDb = async (url: string): Promise<void> => {
  logger.info('Database has connected');
};
