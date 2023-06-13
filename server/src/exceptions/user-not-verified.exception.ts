import { UnauthorizedException } from './unauthorized.exception'

export class UserNotVerifiedException extends UnauthorizedException {
  constructor () {
    super('userNotVerified')
  }
}
