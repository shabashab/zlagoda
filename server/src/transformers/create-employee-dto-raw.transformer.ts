import {
  CreateEmployeeDto,
  CreateEmployeeDtoRaw
} from '../dto/create-employee.dto'
import { Transformer, createTransformer } from './transformer'
import { updateEmployeeDtoRawTransformer } from './update-employee-dto-raw.transformer'

export const createEmployeeDtoRawTransformer: Transformer<
  CreateEmployeeDtoRaw,
  CreateEmployeeDto
> = createTransformer<CreateEmployeeDtoRaw>()
  .copy('employeeId')
  .extend(updateEmployeeDtoRawTransformer)
