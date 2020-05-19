const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  globals: {
    DB_URL: process.env.DB_URL,
  },
};
