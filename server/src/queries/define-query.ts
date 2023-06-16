import { QueryResult, DatabaseError } from 'pg'

interface DefineQueryResult<TInput, TResult> {
  execute: (input: TInput) => Promise<TResult>
}

interface DefineQueryConfig<TInput, TResult> {
  query: string | ((input: TInput) => string)
  values: any[] | ((input: TInput) => any[])
  transformResult: (result: QueryResult) => TResult
  errorHandler: (err: DatabaseError) => TResult
}

export const defineQuery = <TInput, TResult>(
  config: DefineQueryConfig<TInput, TResult>):
    DefineQueryResult<TInput, TResult> => {

}
