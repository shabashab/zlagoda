import { HttpException } from './http-exception'

export class BadRequestException extends HttpException {
  constructor (details?: unknown) {
    super(400, 'Bad request', details)
  }
}
