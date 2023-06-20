import { Category } from '../models/category.model'

export const categories = {
  useCategories: defineDataEndpoint<void, Category[]>({
    method: 'GET',
    url: 'categories',
    requireAuthentication: true,
  }),
  useCreateCategory: defineActionEndpoint<Category, Category>({
    method: 'POST',
    url: 'categories',
    requireAuthentication: true,
    dataBuilder(inputData) {
      return inputData
    },
  }),
  useEditCategory: defineActionEndpoint<Category, Category>({
    method: 'PATCH',
    url: (inpuData) => {
      return `categories/${inpuData.id}`
    },
    requireAuthentication: true,
    dataBuilder(inpuData) {
      return inpuData
    },
  }),
  useDeleteCategory: defineActionEndpoint<Category, void>({
    method: 'DELETE',
    url: (inputData) => {
      return `categories/${inputData.id}`
    },
    requireAuthentication: true,
  }),
}
