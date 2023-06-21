import { CheckWithCashier } from '../models/check.model'
import { CheckWithCashierRaw } from '../models/check.model.raw'
import { checkTransformer } from './check.transformer'
import { employeeTransformer } from './employee.transformer'
import { Transformer, createTransformer } from './transformer'

export const checkWithCashierTransformer: Transformer<
  CheckWithCashierRaw,
  CheckWithCashier
> = createTransformer<CheckWithCashierRaw>()
  .extend(checkTransformer)
  .set('cashier', (input) => {
    return employeeTransformer.transform(input)
  })
