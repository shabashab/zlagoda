import { Product } from '../models/product.model'

export const products = {
  useProducts: defineDataEndpoint<void, Product[]>({
    method: 'GET',
    url: 'products',
    requireAuthentication: true,
  }),
  useEditProduct: defineActionEndpoint<Product, Product>({
    method: 'PATCH',
    url: (inputData) => {
      return `products/${inputData.upc}`
    },
    requireAuthentication: true,
    dataBuilder(inputData) {
      return inputData
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
