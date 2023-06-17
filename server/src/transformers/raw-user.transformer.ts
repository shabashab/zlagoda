import { User } from '../models/user.model'
import { UserRaw } from '../models/user.model.raw'
import { Transformer, createTransformer } from './transformer'

export const rawUserTransformer: Transformer<UserRaw, User> =
  createTransformer<UserRaw>()
    .map('id_employee', 'employeeId')
    .map('login', 'login')
    .map('password_hash', 'passwordHash')
