import { createPluginFromConfiguration } from '@helpers/createPluginFromConfiguration'

export const prefix = '/profile'

export const plugin = createPluginFromConfiguration({
  routes: [import('./patch'), import('./password.patch')]
})
