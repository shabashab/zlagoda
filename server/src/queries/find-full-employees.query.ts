import { Employee } from '../models/employee.model'
import { EmployeeRaw } from '../models/employee.model.raw'
import { fullEmployeeTransformer } from '../transformers/full-employee.transformer'
import { transformQueryResult } from '../transformers/transformer'
import { defineQuery } from './define-query'
import { FindEmployeeQueryInput } from './types/find-employee.query-input'

export const findEmployeesQuery = defineQuery<
  FindEmployeeQueryInput,
  Employee[],
  EmployeeRaw
>({
  query: (input) => {
    let query = `
      SELECT e.id_employee,
        login,
        empl_surname,
        empl_name,
        empl_patronymic,
        empl_role,
        salary,
        date_of_birth,
        date_of_start,
        phone_number,
        city,
        street,
        zip_code 
      FROM "Employee" e LEFT JOIN "User" u ON e.id_employee = u.id_employee 
    `

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

    return query
  },
  values: (input) => {
    const result = []

    if (input.role) result.push(input.role)
    if (input.surname) result.push(input.surname)

    return result
  },
  transformResult: (result) => {
    return transformQueryResult(fullEmployeeTransformer, result)
  }
})
