import { defineQuery } from './define-query'

export const deleteCategoryQuery = defineQuery<number, void, {}>({
  query: `
    DELETE FROM "Category" WHERE "category_number" = $1
  `,
  values: (input) => [input],
  transformResult: (result) => undefined
})
