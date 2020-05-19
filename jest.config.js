const dbUrlOption = process.argv.find(i => i.includes('DB_URL'));

let DB_URL = '';
if (dbUrlOption) {
  DB_URL = dbUrlOption.slice(dbUrlOption.indexOf('=') + 1);
} else {
  console.warn('DB_URL isnt specified!');
}

module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  globals: {
    DB_URL,
  },
};
