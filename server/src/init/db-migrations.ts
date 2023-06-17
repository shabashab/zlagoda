import { Glob } from 'glob'

import * as path from 'path'
import * as fs from 'fs/promises'

import { Parser, Option } from 'node-sql-parser/build/postgresql'

export const name = 'db-migrations'
export const dependencies = ['db']

interface Migration {
  fileName: string
  query: string
}

class InvalidMigrationNameException extends Error {
  constructor (migration: Migration) {
    super(`Invalid migration name ${migration.fileName}`, {
      cause: migration
    })
  }
}

const migrationParseRegex = /([0-9]+)_\S+\.sql/

const getMigrationNumber = (migration: Migration): number => {
  const match = migration.fileName.match(migrationParseRegex)

  if (!match || match.length < 2) {
    throw new InvalidMigrationNameException(migration)
  }

  const rawMigrationNumber = match[1] as string
  return parseInt(rawMigrationNumber)
}

const migrationComparator = (left: Migration, right: Migration): number => {
  const leftNumber = getMigrationNumber(left)
  const rightNumber = getMigrationNumber(right)

  return leftNumber - rightNumber
}

export const init = async () => {
  const glob = new Glob(
    `${path.join(__dirname, '..', '..', 'migrations')}/[0-9]*_*.sql`,
    {}
  )

  const migrations = [] as Migration[]

  const parserOptions: Option = {
    database: 'postgresql'
  }

  const queryParser = new Parser()

  for await (const migrationPath of glob) {
    const fileName = path.basename(migrationPath)

    const migrationFileBuffer = await fs.readFile(migrationPath)
    const query = migrationFileBuffer.toString()

    try {
      queryParser.parse(query, parserOptions)
    } catch (e) {
      if (typeof e === 'object' && e && 'message' in e && 'location' in e) {
        globalThis.logger.error(
          {
            message: e.message,
            location: e.location
          },
          `[db-migrations]: error validating migration ${fileName}`
        )
      }

      throw e
    }

    const migration: Migration = {
      fileName,
      query
    }

    migrations.push(migration)
  }

  migrations.sort(migrationComparator)

  for (const migration of migrations) {
    globalThis.logger.info(`Applying migration ${migration.fileName}`)

    try {
      await globalThis.db.query(migration.query)
    } catch (e) {
      globalThis.logger.error(
        e,
        `Error applying migration ${migration.fileName}`
      )
      throw e
    }

    globalThis.logger.info(`Migration ${migration.fileName} has been applied`)
  }
}
