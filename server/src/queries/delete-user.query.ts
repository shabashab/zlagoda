import { defineQuery } from './define-query'

export const deleteUserQuery = defineQuery<string, void, {}>({
  query: `
    DELETE FROM "User" WHERE "id_employee" = $1
  `,
  values: (input) => [input],
  transformResult: (result) => undefined
})
