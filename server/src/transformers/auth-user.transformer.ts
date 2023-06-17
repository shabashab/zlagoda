import { AuthUser } from '../models/user.model'
import { AuthUserRaw } from '../models/user.model.raw'
import { Transformer, createTransformer } from './transformer'

export const authUserTransformer: Transformer<AuthUserRaw, AuthUser> =
  createTransformer<AuthUserRaw>()
    .mapTransformed(
      'empl_role',
      'role',
      (value) => value as 'cashier' | 'manager'
    )
    .map('id_employee', 'employeeId')
    .map('login', 'login')
