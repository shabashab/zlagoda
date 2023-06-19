import { CreateEmployeeDto } from '../../dto/create-employee.dto'
import { User } from '../../models/user.model'
import { createEmployee } from '../employees/repository'
import { createUser, findUserByLogin } from './repository'

const createRootUserEmployeeDto: CreateEmployeeDto = {
  employeeId: 'M000000000',
  name: 'Root',
  surname: 'Manager',
  phoneNumber: '+000000000000',
  role: 'manager',
  salary: 0,
  street: 'Admin-Panel',
  zipCode: '000000000',
  birthDate: new Date(0),
  startDate: new Date(Date.now()),
  city: 'Admin-Panel'
}

const findRootUserExists = async (): Promise<boolean> => {
  try {
    await findUserByLogin('root')
    return true
  } catch (e) {
    return false
  }
}

const createRootUser = async () => {
  const rootEmployee = await createEmployee(createRootUserEmployeeDto)
  return await createUser({
    employeeId: rootEmployee.employeeId,
    login: 'root',
    password: 'password'
  })
}

export const createRootUserIfNotExists = async (): Promise<false | User> => {
  if (await findRootUserExists()) {
    return false
  }

  return await createRootUser()
}
