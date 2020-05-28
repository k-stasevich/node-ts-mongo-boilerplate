import mongoose from 'mongoose';
import tunnel from 'tunnel-ssh';
import { omit } from 'lodash';
import { logger } from '../helpers/logger';

// mongoose.set('debug', true);

/**
 * Connect to DB through SSH
 */
export const connectToDbSsh = async (options: IConnectToDbSshOptions): Promise<void> => {
  const { dbUrl } = options;

  return new Promise((resolve, reject) => {
    const config: tunnel.Config = {
      port: 22,
      dstPort: 27017,
      ...options,
    };

    logger.info('SSH config', omit(config, 'privateKey'));

    tunnel(config, async (error, server) => {
      if (error) {
        logger.error('SSH connection error: ' + error);
        return reject(error);
      }

      mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      const db = mongoose.connection;

      db.on('error', err => {
        reject(err);
      });

      db.once('open', () => {
        // we're connected!
        logger.info('Database is connected');
        resolve();
      });
    });
  });
};

export const connectToDb = async (url: string) => {
  const result = await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  logger.info(`Database is connected`);
  return result;
};

export const dbDisconnect = () => {
  return mongoose.connection.close();
};

export interface IConnectToDbSshOptions extends tunnel.Config {
  dbUrl: string;
}
