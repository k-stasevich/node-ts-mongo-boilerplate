import { BaseRepository } from './base-repository';
import { IUserPlain, IUser, User } from '../models';

class SupplierRepository extends BaseRepository<IUser, IUserPlain> {}

export const supplierRepository = new SupplierRepository(User);
