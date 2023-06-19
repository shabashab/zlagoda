import {
  UpdateEmployeeDto,
  UpdateEmployeeDtoRaw
} from '../dto/update-employee.dto'
import { Transformer, createTransformer } from './transformer'

export const updateEmployeeDtoRawTransformer: Transformer<
  UpdateEmployeeDtoRaw,
  UpdateEmployeeDto
> = createTransformer<UpdateEmployeeDtoRaw>()
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
