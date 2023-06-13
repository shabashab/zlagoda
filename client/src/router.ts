import {
  RouteLocationNormalized,
  RouteLocationRaw,
  createRouter,
  createWebHistory,
} from 'vue-router'

import routes from '~pages'

type NavigationGuardReturn = void | Error | RouteLocationRaw | boolean
type AsyncNavigationGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) => Promise<NavigationGuardReturn>

const router = createRouter({
  routes,
  history: createWebHistory(),
})

const middlewares = import.meta.glob('./middleware/*.ts', {
  eager: true,
})

Object.entries(middlewares).forEach(([path, middleware]) => {
  if (
    !middleware ||
    typeof middleware !== 'object' ||
    !('default' in middleware) ||
    typeof middleware.default !== 'function'
  ) {
    return
  }

  const middlewareName = path.slice(path.lastIndexOf('/') + 1, path.length - 3)
  const executeMiddleware = middleware.default as AsyncNavigationGuard

  if (middlewareName.endsWith('.global')) {
    router.beforeEach(executeMiddleware)
    return
  }

  router.beforeEach(async (to, from) => {
    if (!('middleware' in to.meta) || !Array.isArray(to.meta.middleware)) return
    if (to.meta.middleware.includes(middlewareName)) {
      return await executeMiddleware(to, from)
    }
  })
})

export { router }
