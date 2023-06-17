import { EmployeeRaw } from './employee.model.raw'

export interface UserRaw {
  id_employee: string
  login: string
  password_hash: string
}

export type AuthUserRaw = Pick<UserRaw, 'id_employee' | 'login'> &
  Pick<EmployeeRaw, 'empl_role'>
export type FullUserRaw = UserRaw & EmployeeRaw
