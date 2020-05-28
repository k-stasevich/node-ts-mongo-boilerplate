const dotenv = require('dotenv');
const dbHelper = require('./migrations-helper');
const path = require('path');

const pathToEnvFile = path.resolve('..', '..', '..', '.env');
dotenv.config({ path: pathToEnvFile });

const { DB_URL } = process.env;

if (!DB_URL) throw new Error('no DB_URL provided');

const { host, databaseName } = dbHelper.parseDbUrl(DB_URL);

console.log('Run migrations:');
console.log('host = ', host);
console.log('databaseName = ', databaseName);
console.log('-------------');

const config = {
  mongodb: {
    url: host,
    databaseName,

    options: {
      useNewUrlParser: true, // removes a deprecation warning when connecting
      useUnifiedTopology: true, // removes a deprecating warning when connecting
      // connectTimeoutMS: 3600000, // increase connection timeout to 1 hour
      // socketTimeoutMS: 3600000, // increase socket timeout to 1 hour
    },
  },

  // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
  migrationsDir: 'migrations',

  // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
  changelogCollectionName: 'changelog',
};

//Return the config as a promise
module.exports = config;
