import { Modify } from './interfaces/Modify';

import { Model, Document } from 'mongoose';

import { IDBOptions, IMongoUpdateReturnResult, WithoutMongoId } from './interfaces/DB';
import { IFindOptions } from './interfaces/IFindOptions';
import { FieldsOf } from './interfaces/FieldsOf.d';
import { MONGO_DUPLICATE_CODE } from '../../constants/mongo.constants';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { mapFields } from '../../helpers/db.helper';

export class BaseRepository<T extends Document, U> {
  constructor(protected entity: Model<T, {}>) {}

  async findManyByIds(
    ids: (string | mongoose.Types.ObjectId)[],
  ): Promise<{ allExist: boolean; data: U[] }> {
    const found = (await (this.entity as any).find({ _id: { $in: ids } })) as T[];

    return {
      allExist: ids.length === found.length,
      data: found.map(i => i.toObject()),
    };
  }

  async find(filter: IQuery<T> = {}, fields?: FieldsOf<T>): Promise<U[]> {
    let options: IFindOptions = {
      __v: 0,
    };

    if (fields) {
      options = { ...mapFields(fields as string[], {}) };
    }

    const result = (await (this.entity as any).find(filter, options)) as T[];
    return result.map(i => i.toObject());
  }

  async findOne(filter: IQuery<T> = {}, fields?: FieldsOf<T>): Promise<U | null> {
    let options: IFindOptions = {};

    if (fields) {
      options = { ...mapFields(fields as string[], {}) };
    }

    const found = (await (this.entity as any).findOne(filter, options)) as T | null;
    return found ? found.toObject() : found;
  }

  async existMany(data: string[], field = '_id'): Promise<{ allExist: boolean; result: T[] }> {
    const result = (await (this.entity as any).find({ [field]: { $in: data } })) as T[];
    return { allExist: result.length === data.length, result };
  }

  async createOne(item: WithoutMongoId<U>, dbOptions: IDBOptions = {}): Promise<U> {
    const { session } = dbOptions;

    try {
      const [created] = await this.entity.create([item], { session });
      return created.toObject ? created.toObject() : created;
    } catch (err) {
      if (err.code === MONGO_DUPLICATE_CODE) {
        throw { already_exist: true };
      }

      throw err;
    }
  }

  async deleteOne(filter: IQuery<T>, dbOptions: IDBOptions = {}) {
    const { session } = dbOptions;
    /* eslint-disable */
    // @ts-ignore
    const result = await this.entity.deleteOne(filter, { session });

    return {
      ...result,
      not_found: result.n === 0,
      success: result.n === 1,
    };
  }

  async updateOne(
    filter: IQuery<T>,
    updates: IQuery<T>,
    dbOptions: IDBOptions = {},
  ): Promise<IUpdateOneReturnResult> {
    const { session } = dbOptions;

    const result = await this.entity.updateOne(filter as any, updates, { session });

    return {
      ...result,
      not_found: result.n === 0,
      success: result.n === 1,
    };
  }
}

// Used to override `_id` prop from ObjectId to string type
export type IQuery<T> = Partial<Modify<T, { _id?: string | ObjectId }>>;

export type IUpdateOneReturnResult = IMongoUpdateReturnResult & {
  success: boolean;
  not_found: boolean;
};
