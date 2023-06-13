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

  let dependantModules = [] as [string, DependantInitModule][]
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

    await initModule.init()

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
        ) > 0
      ) {
        continue
      }

      await lazyInitModule[1].init()
      dependantModules = dependantModules.splice(i, i)
      logModuleInitialization(lazyInitModule[0], lazyInitModule[1])

      break
    }
  }
}

initServer()
  .then(() => loadInit())
  .then(() => startServer())
