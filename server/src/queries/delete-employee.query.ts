import { defineQuery } from './define-query'

export const deleteEmployeeQuery = defineQuery<string, void, {}>({
  query: `
    DELETE FROM "User" WHERE "id_employee" = $1;
    DELETE FROM "Employee" WHERE "id_employee" = $1
  `,
  values: (input) => [input],
  transformResult: () => {}
})
