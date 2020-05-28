module.exports = {
  parseDbUrl(url) {
    const separatorIndex = url.lastIndexOf('/');
    let queryParamsIndex = url.lastIndexOf('?');
    queryParamsIndex = queryParamsIndex === -1 ? undefined : queryParamsIndex;
    const host = url.slice(0, separatorIndex);
    const databaseName = url.slice(separatorIndex + 1, queryParamsIndex);

    return { host, databaseName };
  },

  getStringType() {
    return {
      bsonType: 'string',
      description: 'must be a string and is required',
    };
  },

  getNumberType() {
    return {
      bsonType: 'number',
      description: 'must be a number and is required',
    };
  },
};
