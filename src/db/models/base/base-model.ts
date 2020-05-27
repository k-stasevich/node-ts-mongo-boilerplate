import { getEnv } from '../../../helpers/env.helper';

export const schemaBase = {
  autoIndex: getEnv() === 'development',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
};
