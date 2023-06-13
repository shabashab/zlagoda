import { HttpException } from './http-exception'

export class UnauthorizedException extends HttpException {
  constructor (details?: string) {
    super(401, 'Unauthorized', details)
  }
}
