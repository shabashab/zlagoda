import { CreateSaleDto } from '../dto/create-sale.dto'
import { Sale } from '../models/sale.model'
import { SaleRaw } from '../models/sale.model.raw'
import { saleTransformer } from '../transformers/sale.transformer'
import { defineQuery } from './define-query'

export const createSaleQuery = defineQuery<CreateSaleDto, Sale, SaleRaw>({
  query: `
    INSERT INTO "Sale" (
      "UPC",
      "check_number",
      "product_nuber",
      "selling_price"
    ) VALUES (
      $1, $2, $3, $4
    ) RETURNING *
  `,
  values: (input) => [
    input.upc,
    input.checkId,
    input.productNumber,
    input.productPrice
  ],
  transformResult: (result) => saleTransformer.transform(result.rows[0])
})
