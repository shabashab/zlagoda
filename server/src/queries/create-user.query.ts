import { PublicUser } from '../models/user.model'
import { UserRaw } from '../models/user.model.raw'
import { publicUserTransformer } from '../transformers/public-user.transformer'
import { defineQuery } from './define-query'
import { CreateUserQueryInput } from './types/create-user.query-input'

export const createUserQuery = defineQuery<
  CreateUserQueryInput,
  PublicUser,
  UserRaw
>({
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
    return publicUserTransformer.transform(result.rows[0])
  }
})
