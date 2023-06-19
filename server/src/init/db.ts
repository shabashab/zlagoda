import { Client } from 'pg'
import { parse as parseDatabaseUrl } from 'pg-connection-string'
import { DATABASE_URL } from '../config'

declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var db: Client
}

export const name = 'db'

export const init = async () => {
  const { database, host, port, user, password } =
    parseDatabaseUrl(DATABASE_URL)

  const client = new Client({
    host: host ?? undefined,
    port: port ? parseInt(port) : undefined,
    user,
    password,
    database: database ?? undefined
  })

  await client.connect()

  global.db = client
}
