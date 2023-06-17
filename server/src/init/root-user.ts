import { createRootUserIfNotExists } from '../services/users/root-user'

export const name = 'root-user'
export const dependencies = ['db-migrations', 'db']

export const init = async () => {
  const result = await createRootUserIfNotExists()

  if (result) {
    globalThis.logger.info(
      result,
      '[root-user]: root user has been successfully created'
    )
  } else {
    globalThis.logger.info(
      '[root-user]: root user has been found, ignoring creation'
    )
  }
}
