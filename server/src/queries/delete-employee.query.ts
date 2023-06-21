import { defineQuery } from './define-query'

export const deleteEmployeeQuery = defineQuery<string, void, {}>({
  query: `
    DELETE FROM "Employee" WHERE "id_employee" = $1
  `,
  values: (input) => [input],
  transformResult: () => {}
})
