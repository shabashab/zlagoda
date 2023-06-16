import { Client } from 'pg'

interface Database {
  client: Client
  query: Client['query']
}

declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var db: Database
}

export const name = 'db'

export const init = () => {
  const client = new Client()
  const query = client.query

  global.db = {
    client, query
  }
}
