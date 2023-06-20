import { Category } from '../models/category.model'
import { CategoryRaw } from '../models/category.model.raw'
import { Transformer, createTransformer } from './transformer'

export const categoryTransformer: Transformer<CategoryRaw, Category> =
  createTransformer<CategoryRaw>()
    .map('category_number', 'id')
    .map('category_name', 'name')
