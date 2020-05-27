import mongoose from 'mongoose';

export const createDatabaseSession = async () => {
  return mongoose.startSession();
};

/**
 * Convert format of `['lname', 'fname']` to `{ lname: 1, fname: 1 }`.
 * It is usually used to map `fields` arg for ORM/ODM to select specific fields
 */
export const mapFields = (
  fields: string[] | undefined,
  defaultFields: { [key: string]: 1 },
): { [key: string]: 1 } => {
  if (Array.isArray(fields)) {
    return Object.values(fields).reduce((prev: object, curr: string) => {
      prev[curr] = 1;
      return prev;
    }, {});
  } else {
    return defaultFields;
  }
};

/**
 * TODO: cover with tests
 * Responsible to control `limit` not larger than `max` value.
 */
export const validateLimit = (limit: number | undefined, max: number) => {
  return !limit || limit > max ? max : limit;
};

export const getPaginationAggregationOption = (limit: number, offset: number) => {
  return {
    $facet: {
      paginatedResult: [{ $skip: offset }, { $limit: limit }],
      totalCount: [
        {
          $count: 'count',
        },
      ],
    },
  };
};

export const getPaginatedResult = <T>(
  paginatedResult: any[],
  limit: number,
  offset: number,
): IPaginatedResult<T> => {
  const totalCount = paginatedResult[0].totalCount[0];
  const result = paginatedResult[0].paginatedResult;

  return {
    limit,
    // if result count is 0 mongo does not return object in `totalCount`
    count: totalCount ? totalCount.count : 0,
    offset,
    result,
  };
};

export interface IPaginatedResult<T> {
  limit: number;
  count: number;
  offset: number;
  result: T[];
}
