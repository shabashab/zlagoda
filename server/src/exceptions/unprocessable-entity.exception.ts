import { HttpException } from './http-exception'

export class UnprocessableEntityException extends HttpException {
  constructor (details?: unknown) {
    super(422, 'Unprocessable entity', details)
  }
}
