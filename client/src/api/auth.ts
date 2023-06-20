import { FullEmployee } from '../models/employee.model'
import { SignInDto } from './dto/sign-in.dto'
import { defineActionEndpoint, defineDataEndpoint } from './use-api'

export interface SignInResponse {
  token: string
}

const auth = {
  useSignIn: defineActionEndpoint<SignInDto, SignInResponse>({
    method: 'POST',
    url: 'auth/sign-in',
    dataBuilder: (input) => input,
  }),
  useUser: defineDataEndpoint<void, FullEmployee>({
    method: 'GET',
    url: 'auth',
    requireAuthentication: true,
  }),
}

export default auth
