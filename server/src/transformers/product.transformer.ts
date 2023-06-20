import { Product } from '../models/product.model'
import { ProductRaw } from '../models/product.model.raw'
import { Transformer, createTransformer } from './transformer'

export const productTransformer: Transformer<ProductRaw, Product> =
  createTransformer<ProductRaw>()
    .map('id_product', 'id')
    .map('category_number', 'categoryId')
    .map('product_name', 'name')
    .copy('characteristics')
