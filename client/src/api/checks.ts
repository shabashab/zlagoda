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
}
