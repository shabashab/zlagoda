import { QueryResult, QueryResultRow } from 'pg'

export class TransformerError extends Error {
  constructor (message?: string, input?: any) {
    super(message, {
      cause: input
    })
  }
}

type StringLiteral<T> = T extends string
  ? string extends T
    ? never
    : T
  : never

export type TransformFunction<TInput, TResult> = (input: TInput) => TResult

type ActionFunction = (input: any, previousResult: any) => any

export interface Transformer<TInput, TResult = {}> {
  copy: <T extends keyof TInput>(
    key: StringLiteral<T>
  ) => Transformer<
    TInput,
    TResult & {
      // eslint-disable-next-line no-unused-vars
      [k in typeof key]: TInput[typeof key]
    }
  >

  exclude: <T extends keyof TResult>(
    key: T
  ) => Transformer<TInput, Omit<TResult, typeof key>>

  mapTransformed: <T, TTransformerResult, TInputLiteral extends keyof TInput>(
    from: StringLiteral<TInputLiteral>,
    to: StringLiteral<T>,
    transform: TransformFunction<TInput[typeof from], TTransformerResult>
  ) => Transformer<
    TInput,
    TResult & {
      // eslint-disable-next-line no-unused-vars
      [key in typeof to]: TTransformerResult
    }
  >

  map: <TInputLiteral extends keyof TInput, T>(
    from: StringLiteral<TInputLiteral>,
    to: StringLiteral<T>
  ) => Transformer<
    TInput,
    TResult & {
      // eslint-disable-next-line no-unused-vars
      [key in typeof to]: TInput[typeof from]
    }
  >

  set: <T, TValue>(
    key: StringLiteral<T>,
    value: TValue | ((input: TInput, currentResult: TResult) => TValue)
  ) => Transformer<
    TInput,
    TResult & {
      // eslint-disable-next-line no-unused-vars
      [k in typeof key]: TValue
    }
  >

  extend: <TTransformerResult, TTransformerInput extends Partial<TInput>>(
    transformer: Transformer<TTransformerInput, TTransformerResult>
  ) => Transformer<TInput, TResult & TTransformerResult>

  transform: TransformFunction<TInput, TResult>

  getRawActions: () => ActionFunction[]

  createCopy: () => Transformer<TInput, TResult>
}

const copyAction =
  (key: string | number | symbol) =>
    (input: any, previousResult: any): any => {
      previousResult[key] = input[key]
      return previousResult
    }

const excludeAction =
  (key: string) =>
    (input: any, previousResult: any): any => {
      if (key in previousResult) {
        ;(previousResult as { [key: string]: any })[key] = undefined
      }

      return previousResult
    }

const mapAction =
  (from: string, to: string, transform?: TransformFunction<any, any>) =>
    (input: any, previousResult: any): any => {
      if (from in input) {
        const transformedValue = transform ? transform(input[from]) : input[from]

        previousResult[to] = transformedValue
      }

      return previousResult
    }

const setAction =
  (key: string, value: any | ((input: any, currentResult: any) => any)) =>
    (input: any, previousResult: any): any => {
      const valueToSet =
      typeof value === 'function' ? value(input, previousResult) : value

      previousResult[key] = valueToSet
      return previousResult
    }

const createTransformerWithActions = <TInput>(
  actions: ActionFunction[]
): Transformer<TInput> => {
  const transformActions: ActionFunction[] = []

  const transformer: Transformer<TInput> = {
    copy: (key) => {
      transformActions.push(copyAction(key))
      return transformer as any
    },
    exclude: (key) => {
      transformActions.push(excludeAction(key))
      return transformer as any
    },
    map: (from, to) => {
      transformActions.push(mapAction(from as string, to as string))
      return transformer as any
    },
    mapTransformed: (from, to, transform) => {
      transformActions.push(mapAction(from as string, to as string, transform))
      return transformer as any
    },
    set: (key, value) => {
      transformActions.push(setAction(key, value))
      return transformer as any
    },
    getRawActions () {
      return transformActions
    },
    extend: (inputTransformer) => {
      const transformerActions = inputTransformer.createCopy().getRawActions()
      transformActions.push(...transformerActions)
      return transformer as any
    },
    createCopy: () => {
      return createTransformerWithActions([...transformActions])
    },
    transform: (input) => {
      if (!input) {
        throw new TransformerError('Input cannot be undefined or null', input)
      }

      let result = {}

      for (const action of transformActions) {
        result = action(input, result)
      }

      return result
    }
  }

  return transformer
}

export const createTransformer = <TInput>() =>
  createTransformerWithActions<TInput>([])

export const transformQueryResult =
  <TInput extends QueryResultRow, TResult>(
    transformer: Transformer<TInput, TResult>
  ) =>
    (queryResult: QueryResult<TInput>) => {
      const result = []

      for (const row of queryResult.rows) {
        result.push(transformer.transform(row))
      }

      return result
    }
