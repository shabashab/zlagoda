import { createPluginFromConfiguration } from '@helpers/createPluginFromConfiguration'

export const prefix = '/transactions'

export const plugin = createPluginFromConfiguration({
  routes: [import('./get')]
})
