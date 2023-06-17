import { Glob } from 'glob'
import * as path from 'path'

import { startServer, init as initServer } from './server'

type InitModule = {
  init: () => unknown | Promise<unknown>
  name?: string
}

type DependantInitModule = {
  dependencies: string[]
} & InitModule

const isDependant = (
  initModule: InitModule
): initModule is DependantInitModule => {
  return 'dependencies' in initModule && Array.isArray(initModule.dependencies)
}

const isInitModule = (value: unknown): value is InitModule => {
  if (!value) return false

  const hasInitFunciton =
    typeof value === 'object' &&
    'init' in value &&
    typeof value.init === 'function'

  if (!hasInitFunciton) return false

  const hasCorrectName =
    ('name' in value && typeof value.name === 'string') || !('name' in value)

  return hasInitFunciton && hasCorrectName
}

const logModuleInitialization = (
  initModulePath: string,
  initModule: InitModule
) => {
  if (initModule.name) {
    globalThis.logger.info(
      `[init]: Initialized module ${initModulePath} (${initModule.name})`
    )
  } else {
    globalThis.logger.info(`[init]: Initialized module ${initModulePath}`)
  }
}

const loadInit = async () => {
  const glob = new Glob(`${path.join(__dirname, 'init')}/*.{ts,js}`, {})

  const dependantModules = [] as [string, DependantInitModule][]
  const initializedModules = [] as string[]

  for await (const initPath of glob) {
    const initPathName = path.relative(__dirname, initPath)
    const initModule = await import(initPath)

    if (!isInitModule(initModule)) {
      globalThis.logger.error(`[init]: Invalid init module ${initPathName}`)
      continue
    }

    if (isDependant(initModule)) {
      dependantModules.push([initPathName, initModule])
      continue
    }

    try {
      await initModule.init()
    } catch (e) {
      globalThis.logger.error(
        e,
        `[init]: error while initializing module ${initPathName}`
      )
      throw e
    }

    logModuleInitialization(initPathName, initModule)

    if (initModule.name) {
      initializedModules.push(initModule.name)
    }
  }

  while (dependantModules.length > 0) {
    for (let i = 0; i < dependantModules.length; i++) {
      const lazyInitModule = dependantModules[i]

      if (
        lazyInitModule[1].dependencies.findIndex(
          (dependencyName) => !initializedModules.includes(dependencyName)
        ) >= 0
      ) {
        continue
      }

      try {
        await lazyInitModule[1].init()
      } catch (e) {
        globalThis.logger.error(
          e,
          `[init]: error while initializing module ${lazyInitModule[0]}`
        )
        throw e
      }

      dependantModules.splice(i, 1)
      if (lazyInitModule[1].name) {
        initializedModules.push(lazyInitModule[1].name)
      }
      logModuleInitialization(lazyInitModule[0], lazyInitModule[1])
    }
  }
}

const start = async () => {
  try {
    await initServer()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Error initializing server', e)

    process.exit(1)
  }

  try {
    await loadInit()
  } catch (e) {
    process.exit(1)
  }

  await startServer()
}

start()
  .then(() => {
    // nothing
  })
  .catch((reason) => {
    // eslint-disable-next-line no-console
    console.error('Server closed unexpetadly', reason)
  })
