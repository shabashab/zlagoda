import { UpdateEmployeeDto } from '../dto/update-employee.dto'
import { Employee } from '../models/employee.model'
import { EmployeeRaw } from '../models/employee.model.raw'
import { employeeTransformer } from '../transformers/employee.transformer'
import { defineQuery } from './define-query'

export const updateEmployeeQuery = defineQuery<
  [string, UpdateEmployeeDto],
  Employee,
  EmployeeRaw
>({
  query: `
    UPDATE "Employee" SET (
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
    ) = (
      $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
    ) WHERE id_employee = $1 RETURNING *
  `,
  values: (input) => [
    input[0],
    input[1].surname,
    input[1].name,
    input[1].patronymic ?? null,
    input[1].role,
    input[1].salary,
    input[1].birthDate,
    input[1].startDate,
    input[1].phoneNumber,
    input[1].city,
    input[1].street,
    input[1].zipCode
  ],
  transformResult: (result) => {
    return employeeTransformer.transform(result.rows[0])
  }
})
