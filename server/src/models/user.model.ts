import { Employee } from './employee.model'

export interface User {
  employeeId: string
  login: string
  passwordHash: string
}

export type AuthUser = Pick<User, 'employeeId' | 'login'> &
  Pick<Employee, 'role'>
export type PublicUser = Omit<User, 'passwordHash'>
export type FullUser = PublicUser & {
  employee: Employee
}
