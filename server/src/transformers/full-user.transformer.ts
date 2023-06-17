import { FullUser } from '../models/user.model'
import { FullUserRaw } from '../models/user.model.raw'
import { employeeTransformer } from './employee.transformer'
import { publicUserTransformer } from './public-user.transformer'
import { Transformer, createTransformer } from './transformer'

export const fullUserTransformer: Transformer<FullUserRaw, FullUser> =
  createTransformer<FullUserRaw>()
    .extend(publicUserTransformer)
    .set('employee', (input) => {
      return employeeTransformer.transform(input)
    })
