import { Employee } from '../../models/employee.model'

export interface FindEmployeeQueryInput {
  role?: Employee['role']
  surname?: string
}
