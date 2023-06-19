import { EmployeeRaw } from './employee.model.raw'
import { PublicUserRaw } from './user.model.raw'

export type FullEmployeeRaw = Partial<PublicUserRaw> & EmployeeRaw
