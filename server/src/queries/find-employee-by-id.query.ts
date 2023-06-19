import { NotFoundException } from '../exceptions/not-found.exception'
import { Employee } from '../models/employee.model'
import { EmployeeRaw } from '../models/employee.model.raw'
import { employeeTransformer } from '../transformers/employee.transformer'
import { defineQuery } from './define-query'

export const findEmployeeByIdQuery = defineQuery<string, Employee, EmployeeRaw>(
  {
    query: 'SELECT * FROM "Employee" WHERE id_employee = $1',
    values: (input) => [input],
    transformResult: (result) => {
      if (result.rowCount === 0) {
        throw new NotFoundException(
          "User with given employee id hasn't been found"
        )
      }

      return employeeTransformer.transform(result.rows[0])
    }
  }
)
