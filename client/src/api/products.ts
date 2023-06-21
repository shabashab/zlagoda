import { omit } from 'lodash'
import { Product } from '../models/product.model'

export const products = {
  useProducts: defineDataEndpoint<{ categoryId?: string }, Product[]>({
    method: 'GET',
    url: 'products',
    requireAuthentication: true,
    queryBuilder(inputData) {
      return inputData
    },
  }),
  useEditProduct: defineActionEndpoint<Product, Product>({
    method: 'PATCH',
    url: (inputData) => {
      return `products/${inputData.upc}`
    },
    requireAuthentication: true,
    dataBuilder(inputData) {
      return omit(inputData, ['id', 'upc', 'promoPrice', 'categoryName'])
    },
  }),
  useCreateProduct: defineActionEndpoint<Product, Product>({
    method: 'POST',
    url: 'products',
    dataBuilder(inputData) {
      return inputData
    },
    requireAuthentication: true,
  }),
  useProduct: defineDataEndpoint<string, Product>({
    method: 'GET',
    url: (input) => {
      return `products/${input}`
    },
    requireAuthentication: true,
  }),
}
