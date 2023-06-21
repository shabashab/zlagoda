import { Sale } from '../models/sale.model'
import { SaleRaw } from '../models/sale.model.raw'
import { saleTransformer } from '../transformers/sale.transformer'
import { transformQueryResult } from '../transformers/transformer'
import { defineQuery } from './define-query'

export const findSalesByCheckIdQuery = defineQuery<string, Sale[], SaleRaw>({
  query: `
    SELECT * FROM "Sale" WHERE "check_number" = $1
  `,
  values: (input) => [input],
  transformResult: (result) => {
    return transformQueryResult(saleTransformer, result)
  }
})
