import { HttpException } from './http-exception'

export class ConflictException extends HttpException {
  constructor (details?: string) {
    super(409, 'Conflict', details)
  }
}
