import { ObjectId } from 'bson';
import { ClientSession } from 'mongodb';

export interface IDBOptions {
  session?: ClientSession;
}

export type WithoutMongoId<T> = Omit<T, '_id'>;
export type WithMongoObjectId<T> = T & { _id: ObjectId };
export type WithTimestamps<T> = T & { created_at: Date; updated_at: Date };

// export type IFilterByModel<T> =

export type IMongoUpdateReturnResult = {
  n: number;
  nModified: number;
};
