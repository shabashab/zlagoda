import { QueryResult, DatabaseError, QueryResultRow } from 'pg'

interface DefineQueryResult<TInput, TResult> {
  execute: (input: TInput) => Promise<TResult>
}

interface DefineQueryConfig<
  TInput,
  TResult,
  RowType extends QueryResultRow = any
> {
  query: string | ((input: TInput) => string)
  values?: any[] | ((input: TInput) => any[])
  transformResult: (result: QueryResult<RowType>) => TResult
  errorHandler?: (err: DatabaseError) => TResult
}

export const defineQuery = <
  TInput,
  TResult,
  RowType extends QueryResultRow = any
>(
    config: DefineQueryConfig<TInput, TResult, RowType>
  ): DefineQueryResult<TInput, TResult> => {
  const compileQuery = (input: TInput): string =>
    typeof config.query === 'function' ? config.query(input) : config.query

  const compileValues = (input: TInput): any[] => {
    if (!config.values) {
      return []
    }

    return typeof config.values === 'function'
      ? config.values(input)
      : config.values
  }

  const execute = async (input: TInput): Promise<TResult> => {
    const compiledQuery = compileQuery(input)
    const compiledValues = compileValues(input)

    try {
      const result = await globalThis.db.query(compiledQuery, compiledValues)

      return config.transformResult(result)
    } catch (e) {
      if (config.errorHandler && e instanceof DatabaseError) {
        return config.errorHandler(e)
      } else {
        throw e
      }
    }
  }

  return {
    execute
  }
}
