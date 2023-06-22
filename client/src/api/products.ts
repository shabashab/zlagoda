import { omit } from 'lodash'
import { Product } from '../models/product.model'
import { Category } from '../models/category.model'

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
  useStats: defineDataEndpoint<
  {
    upc: string
    selectedDates: Date[]
  },
  any
  >({
    method: 'GET',
    url: (input) => {
      return `/products/${input.upc}/stats`
    },
    queryBuilder(inputData) {
      return {
        from: inputData.selectedDates[0].setUTCHours(0, 1),
        to: inputData.selectedDates[1].setUTCHours(23, 59),
      }
    },
    requireAuthentication: true,
  }),
  useMinMax: defineDataEndpoint<
  {
    category: Category
    range: number[]
  },
  Product
  >({
    method: 'GET',
    url: '/products/min-max',
    queryBuilder(inputData) {
      return {
        categoryId: inputData.category.id,
        min: inputData.range[0],
        max: inputData.range[1],
      }
    },
    requireAuthentication: true,
  }),
}
