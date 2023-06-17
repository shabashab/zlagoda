import { CreateEmployeeDto } from '../../dto/create-employee.dto'
import { createEmployeeQuery } from '../../queries/create-employee.query'

export const createEmployee = async (createEmployeeDto: CreateEmployeeDto) => {
  return await createEmployeeQuery.execute(createEmployeeDto)
}
