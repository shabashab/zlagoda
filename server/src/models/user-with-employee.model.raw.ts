import { EmployeeRaw } from './employee.model.raw'
import { UserRaw } from './user.model.raw'

export type UserWithEmployeeRaw = UserRaw & EmployeeRaw
