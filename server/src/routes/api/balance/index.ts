import { createPluginFromConfiguration } from '@helpers/createPluginFromConfiguration'

export const prefix = '/balance'

export const plugin = createPluginFromConfiguration({
  routes: [import('./stats.get')]
})
