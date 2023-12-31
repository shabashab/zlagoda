import { CreateEmployeeDto } from '../../dto/create-employee.dto'
import { UpdateEmployeeDto } from '../../dto/update-employee.dto'
import { createEmployeeQuery } from '../../queries/create-employee.query'
import { findEmployeeByIdQuery } from '../../queries/find-employee-by-id.query'
import { findEmployeesQuery } from '../../queries/find-full-employees.query'
import { findFullEmployeeByIdQuery } from '../../queries/find-full-employee-by-id.query'
import { FindEmployeeQueryInput } from '../../queries/types/find-employee.query-input'
import { updateEmployeeQuery } from '../../queries/update-employee.query'
import { deleteUserQuery } from '../../queries/delete-user.query'
import { deleteEmployeeQuery } from '../../queries/delete-employee.query'

export const createEmployee = async (createEmployeeDto: CreateEmployeeDto) => {
  return await createEmployeeQuery.execute(createEmployeeDto)
}

export const findEmployeeById = (id: string) =>
  findEmployeeByIdQuery.execute(id)
export const findFullEmployeeById = (id: string) =>
  findFullEmployeeByIdQuery.execute(id)
export const findEmployeesByFilter = (filter: FindEmployeeQueryInput) =>
  findEmployeesQuery.execute(filter)
export const updateEmployeeById = (
  id: string,
  updateEmployeeDto: UpdateEmployeeDto
) => updateEmployeeQuery.execute([id, updateEmployeeDto])

export const deleteEmployeeById = async (id: string) => {
  await deleteUserQuery.execute(id)
  await deleteEmployeeQuery.execute(id)
}
