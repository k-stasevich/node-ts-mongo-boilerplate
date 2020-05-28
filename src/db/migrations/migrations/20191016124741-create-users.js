const collectionName = 'users';

module.exports = {
  async up(db) {
    await db.createCollection(collectionName, {});
  },
  async down(db) {
    await db.dropCollection(collectionName);
  },
};
