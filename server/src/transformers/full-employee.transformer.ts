import { FullEmployee } from '../models/employee.model'
import { FullEmployeeRaw } from '../models/full-employee.model.raw'
import { PublicUserRaw } from '../models/user.model.raw'
import { employeeTransformer } from './employee.transformer'
import { publicUserTransformer } from './public-user.transformer'
import { Transformer, createTransformer } from './transformer'

export const fullEmployeeTransformer: Transformer<
  FullEmployeeRaw,
  FullEmployee
> = createTransformer<FullEmployeeRaw>()
  .extend(employeeTransformer)
  .mapTransformed('sold_total', 'totalSold', parseFloat)
  .set('user', (input) => {
    if (!input.login) {
      return null
    }

    return publicUserTransformer.transform(input as PublicUserRaw)
  })
