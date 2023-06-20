import { Category } from '../models/category.model'
import { CategoryRaw } from '../models/category.model.raw'
import { categoryTransformer } from '../transformers/category.transformer'
import { transformQueryResult } from '../transformers/transformer'
import { defineQuery } from './define-query'

export const findCategoriesQuery = defineQuery<void, Category[], CategoryRaw>({
  query: `
    SELECT * FROM "Category"
  `,
  transformResult: (result) =>
    transformQueryResult(categoryTransformer, result)
})
