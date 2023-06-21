import { Sale } from '../models/sale.model'
import { SaleRaw } from '../models/sale.model.raw'
import { Transformer, createTransformer } from './transformer'

export const saleTransformer: Transformer<SaleRaw, Sale> =
  createTransformer<SaleRaw>()
    .map('UPC', 'upc')
    .map('check_number', 'checkId')
    .map('product_nuber', 'productNumber')
    .mapTransformed('selling_price', 'productPrice', parseFloat)
