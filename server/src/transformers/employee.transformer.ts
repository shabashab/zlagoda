import { Employee } from '../models/employee.model'
import { EmployeeRaw } from '../models/employee.model.raw'
import { Transformer, createTransformer } from './transformer'

export const employeeTransformer: Transformer<EmployeeRaw, Employee> =
  createTransformer<EmployeeRaw>()
    .map('date_of_birth', 'birthDate')
    .map('date_of_start', 'startDate')
    .map('empl_name', 'name')
    .map('empl_surname', 'surname')
    .map('empl_patronymic', 'patronymic')
    .mapTransformed(
      'empl_role',
      'role',
      (value) => value as 'cashier' | 'manager'
    )
    .map('id_employee', 'employeeId')
    .map('phone_number', 'phoneNumber')
    .map('zip_code', 'zipCode')
    .copy('city')
    .copy('salary')
    .copy('street')
