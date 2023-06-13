import { FastifyPluginAsync, RouteOptions } from 'fastify'

export interface PluginModule {
  plugin: FastifyPluginAsync<{}>
  prefix: string
}

export interface RouteModule {
  options: RouteOptions | RouteOptions[]
}

export interface CreatePluginConfiguration {
  plugins?: (Promise<PluginModule> | PluginModule)[]
  routes?: (Promise<RouteModule> | RouteModule | undefined)[]
  devRoutes?: (Promise<RouteModule> | RouteModule | undefined)[]
  extend?: FastifyPluginAsync<{}>
}

export const createPluginFromConfiguration = (
  configuration: CreatePluginConfiguration
): FastifyPluginAsync<{}> => {
  return async (fastify, options) => {
    if (process.env.NODE_ENV !== 'production' && configuration.devRoutes) {
      if (!configuration.routes) {
        configuration.routes = []
      }
      configuration.routes.push(...configuration.devRoutes)
    }

    const [plugins, routes] = await Promise.all([
      Promise.all(configuration.plugins ?? []),
      Promise.all(configuration.routes ?? [])
    ])

    for (const plugin of plugins) {
      fastify.register(plugin.plugin, { prefix: plugin.prefix })
    }

    for (const routeModule of routes) {
      if (!routeModule) {
        return
      }

      if (Array.isArray(routeModule.options)) {
        for (const route of routeModule.options) {
          fastify.route(route)
        }

        continue
      }

      fastify.route(routeModule.options)
    }

    if (configuration.extend) {
      configuration.extend(fastify, {})
    }
  }
}
