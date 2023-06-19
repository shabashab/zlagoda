import {
  CreateEmployeeDto,
  CreateEmployeeDtoRaw
} from '../dto/create-employee.dto'
import { Transformer, createTransformer } from './transformer'

export const createEmployeeDtoRawTransformer: Transformer<
  CreateEmployeeDtoRaw,
  CreateEmployeeDto
> = createTransformer<CreateEmployeeDtoRaw>()
  .copy('employeeId')
  .copy('surname')
  .copy('name')
  .copy('patronymic')
  .copy('role')
  .copy('salary')
  .mapTransformed(
    'birthDate',
    'birthDate',
    (dateString) => new Date(dateString)
  )
  .mapTransformed(
    'startDate',
    'startDate',
    (dateString) => new Date(dateString)
  )
  .copy('phoneNumber')
  .copy('city')
  .copy('street')
  .copy('zipCode')
