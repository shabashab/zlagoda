import { Employee } from '../models/employee.model'
import { EmployeeRaw } from '../models/employee.model.raw'
import { employeeTransformer } from '../transformers/employee.transformer'
import { transformQueryResult } from '../transformers/transformer'
import { defineQuery } from './define-query'
import { FindEmployeeQueryInput } from './types/find-employee.query-input'

export const findEmployeesQuery = defineQuery<
  FindEmployeeQueryInput,
  Employee[],
  EmployeeRaw
>({
  query: (input) => {
    let query = 'SELECT * FROM "Employee"'

    if (input.role || input.surname) {
      let paramId = 1

      const conditions: string[] = []

      if (input.role) {
        conditions.push(`"empl_role" = $${paramId}`)
        paramId++
      }

      if (input.surname) {
        conditions.push(`"empl_surname" = $${paramId}`)
      }

      query += ` WHERE ${conditions.join(' AND ')}`
    }

    globalThis.logger.info(query)

    return query
  },
  values: (input) => {
    const result = []

    if (input.role) result.push(input.role)
    if (input.surname) result.push(input.surname)

    return result
  },
  transformResult: (result) => {
    return transformQueryResult(employeeTransformer, result)
  }
})
