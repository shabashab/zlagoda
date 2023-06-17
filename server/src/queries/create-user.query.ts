import { User } from '../models/user.model'
import { UserRaw } from '../models/user.model.raw'
import { rawUserTransformer } from '../transformers/raw-user.transformer'
import { defineQuery } from './define-query'
import { CreateUserQueryInput } from './types/create-user.query-input'

export const createUserQuery = defineQuery<CreateUserQueryInput, User, UserRaw>(
  {
    query: `
    INSERT INTO "User" (
      id_employee,
      login,
      password_hash
    ) VALUES (
      $1, $2, $3
    ) RETURNING *
  `,
    values: (input) => [input.employeeId, input.login, input.passwordHash],
    transformResult: (result) => {
      return rawUserTransformer.transform(result.rows[0])
    }
  }
)
