/* eslint-disable no-console */
import * as dotenv from 'dotenv'

dotenv.config()

export const env = (
  key: keyof typeof process.env,
  defaultValue?: string
): string => {
  const envValue = process.env[key]

  if (!envValue || typeof envValue !== 'string') {
    if (defaultValue) {
      console.warn(
        `[env]: Environment variable ${key} hasn't been found. Falling back to default value`
      )
      return defaultValue
    }

    console.error(
      `FATAL [env]: Environment variable ${key} hasn't been found. No default value provided`
    )
    throw new Error(
      `FATAL [env]: Environment variable ${key} hasn't been found. No default value provided`
    )
  }

  return envValue
}

export const envNumber = (
  key: keyof typeof process.env,
  defaultValue?: number
): number => {
  const envValue = process.env[key]

  if (!envValue || typeof envValue !== 'string') {
    if (defaultValue) {
      console.warn(
        `[env]: Environment variable ${key} hasn't been found. Falling back to default value`
      )
      return defaultValue
    }
    console.error(
      `FATAL [env]: Environment variable ${key} hasn't been found. No default value provided`
    )
    throw new Error(
      `FATAL [env]: Environment variable ${key} hasn't been found. No default value provided`
    )
  }

  const parsedValue = parseInt(envValue)

  if (Number.isNaN(parsedValue)) {
    if (defaultValue) {
      console.warn(
        `[env]: Environment variable ${key} is not a number. Falling back to default value`
      )
      return defaultValue
    }
    console.error(
      `FATAL [env]: Environment variable ${key} is not a number. No default value provided`
    )
    throw new Error(
      `FATAL [env]: Environment variable ${key} is not a number. No default value provided`
    )
  }

  return parsedValue
}

export const envBool = (
  key: keyof typeof process.env,
  defaultValue?: boolean
): boolean => {
  const envValue = process.env[key]

  if (!envValue || typeof envValue !== 'string') {
    if (defaultValue) {
      console.warn(
        `[env]: Environment variable ${key} hasn't been found. Falling back to default value`
      )
      return defaultValue
    }
    console.error(
      `FATAL [env]: Environment variable ${key} hasn't been found. No default value provided`
    )
    throw new Error(
      `FATAL [env]: Environment variable ${key} hasn't been found. No default value provided`
    )
  }

  return envValue === 'true'
}
