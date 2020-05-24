import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectToDb } from '../db-connect';

dotenv.config();

// seeds
// TODO: import your seeds here

console.log('DB_URL', process.env.DB_URL);
console.log('NODE_ENV', process.env.NODE_ENV);

(async function() {
  await connectToDb(process.env.DB_URL as string);

  console.log('\nSuccess');

  await mongoose.disconnect();

  process.exit(0);
})();
