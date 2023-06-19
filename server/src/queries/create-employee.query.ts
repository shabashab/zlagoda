import { CreateEmployeeDto } from '../dto/create-employee.dto'
import { Employee } from '../models/employee.model'
import { EmployeeRaw } from '../models/employee.model.raw'
import { employeeTransformer } from '../transformers/employee.transformer'
import { defineQuery } from './define-query'

export const createEmployeeQuery = defineQuery<
  CreateEmployeeDto,
  Employee,
  EmployeeRaw
>({
  query: `
    INSERT INTO "Employee" (
      id_employee,
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
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
    ) RETURNING *
  `,
  values: (input) => [
    input.employeeId,
    input.surname,
    input.name,
    input.patronymic ?? null,
    input.role,
    input.salary,
    input.birthDate,
    input.startDate,
    input.phoneNumber,
    input.city,
    input.street,
    input.zipCode
  ],
  transformResult: (result) => {
    return employeeTransformer.transform(result.rows[0])
  }
})
