import { Employee } from '../models/employee.model'
import { CreateCheckDto } from './dto/CreateCheckDto'

export const checks = {
  useCreateCheck: defineActionEndpoint<CreateCheckDto, CreateCheckDto>({
    method: 'POST',
    url: 'checks',
    dataBuilder(inputData) {
      return inputData
    },
    requireAuthentication: true,
  }),
  useChecks: defineDataEndpoint<
  {
    selectedDates?: Date[]
    cachierId: string
  },
  any
  >({
    method: 'GET',
    url: 'checks',
    requireAuthentication: true,
    queryBuilder(inputData) {
      if (inputData.selectedDates)
        return {
          from: inputData.selectedDates[0].setUTCHours(0, 1),
          to: inputData.selectedDates[1].setUTCHours(23, 59),
          employeeId: inputData.cachierId,
        }
    },
  }),
  useCheck: defineDataEndpoint<{ checkId: string }, any>({
    method: 'GET',
    url: (input) => {
      return `checks/${input.checkId}`
    },
    requireAuthentication: true,
  }),
}
