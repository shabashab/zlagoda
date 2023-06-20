import _ from 'lodash'
import { Employee, FullEmployee } from '../models/employee.model'

export const employees = {
  useEmployees: defineDataEndpoint<void, FullEmployee[]>({
    method: 'GET',
    url: 'employees',
    requireAuthentication: true,
    transformResponseData(responseData) {
      return (responseData as any[]).map((el) => {
        return {
          ...el,
          birthDate: new Date(el.birthDate),
          startDate: new Date(el.startDate),
        }
      })
    },
  }),
  useEditEmployees: defineActionEndpoint<FullEmployee, FullEmployee>({
    method: 'PATCH',
    url: (input) => {
      return `employees/${input.employeeId}`
    },
    requireAuthentication: true,
    dataBuilder(inputData) {
      return _.omit(
        {
          ...inputData,
          birthDate: inputData.birthDate.toISOString(),
          startDate: inputData.startDate.toISOString(),
        },
        ['employeeId', 'user']
      )
    },
  }),
  useCreateEmployee: defineActionEndpoint<Employee, FullEmployee>({
    method: 'POST',
    url: '/employees',
    requireAuthentication: true,
    dataBuilder(inputData) {
      return {
        ...inputData,
        birthDate: inputData.birthDate.toISOString(),
        startDate: inputData.startDate.toISOString(),
      }
    },
  }),
}
