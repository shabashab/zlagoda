export interface ResponseError {
  status: number
  message: string
  details?: string
}

export type ErrorOr<T> = ResponseError | T

export const isError = <T>(input: ErrorOr<T>): input is ResponseError => {
  if (!input) return false
  if ((input as ResponseError).message && (input as ResponseError).status)
    return true
  else return false
}
