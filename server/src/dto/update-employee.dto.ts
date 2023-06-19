import { CreateEmployeeDto } from './create-employee.dto'

export type UpdateEmployeeDto = Omit<CreateEmployeeDto, 'employeeId'>

export type UpdateEmployeeDtoRaw = Omit<
  UpdateEmployeeDto,
  'birthDate' | 'startDate'
> & {
  birthDate: string
  startDate: string
}
