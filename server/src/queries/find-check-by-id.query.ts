import { NotFoundException } from '../exceptions/not-found.exception'
import { Check } from '../models/check.model'
import { CheckRaw } from '../models/check.model.raw'
import { checkTransformer } from '../transformers/check.transformer'
import { defineQuery } from './define-query'

export const findCheckByIdQuery = defineQuery<string, Check, CheckRaw>({
  query: `
    SELECT * FROM "Check" WHERE "check_number" = $1
  `,
  values: (input) => [input],
  transformResult: (result) => {
    if (result.rowCount < 1) {
      throw new NotFoundException()
    }

    return checkTransformer.transform(result.rows[0])
  }
})
