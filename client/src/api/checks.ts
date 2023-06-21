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
  useChecks: defineDataEndpoint<void, any>({
    method: 'GET',
    url: 'checks',
    requireAuthentication: true,
  }),
  useCheck: defineDataEndpoint<{ checkId: string }, any>({
    method: 'GET',
    url: (input) => {
      return `checks/${input.checkId}`
    },
    requireAuthentication: true,
  }),
}
