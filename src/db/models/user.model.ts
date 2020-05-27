import mongoose, { Schema, Document } from 'mongoose';
import { ObjectId } from 'bson';
import { schemaBase } from './base/base-model';

export interface IOrder {
  _id: ObjectId;
  status: string;
}

export interface IUserPlain {
  _id: ObjectId;
  fname: string;
  lname: string;
  orders: IOrder[];
}

export interface IUser extends Document, IUserPlain {
  _id: ObjectId;
}

const ordersSchema = new Schema(
  {
    status: { type: String, required: true },
  },
  { ...schemaBase },
);

export const UserSchema: Schema = new Schema(
  {
    id: { type: String, required: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    orders: { type: [ordersSchema], required: true },
  },
  { ...schemaBase },
);

export const User = mongoose.model<IUser>(
  //
  'users',
  UserSchema,
  'users',
);
