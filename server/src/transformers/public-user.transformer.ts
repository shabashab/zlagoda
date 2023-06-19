import { PublicUser } from '../models/user.model'
import { PublicUserRaw } from '../models/user.model.raw'
import { Transformer, createTransformer } from './transformer'

export const publicUserTransformer: Transformer<PublicUserRaw, PublicUser> =
  createTransformer<PublicUserRaw>()
    .map('id_employee', 'employeeId')
    .copy('login')
