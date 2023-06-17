import { PublicUser } from '../models/user.model'
import { UserRaw } from '../models/user.model.raw'
import { Transformer, createTransformer } from './transformer'

export const publicUserTransformer: Transformer<UserRaw, PublicUser> =
  createTransformer<UserRaw>().map('id_employee', 'employeeId').copy('login')
