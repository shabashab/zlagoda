import { TwoFactorInfoDto } from '../models/two-factor-info.model'
import { User } from '../models/user.model'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'
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
  useUser: defineDataEndpoint<void, User>({
    method: 'GET',
    url: 'auth',
    requireAuthentication: true,
  }),
}

export default auth
