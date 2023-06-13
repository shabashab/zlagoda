export class HttpException extends Error {
  constructor (
    public readonly status: number,
    message?: string,
    public details?: unknown
  ) {
    super(message)
  }
}
