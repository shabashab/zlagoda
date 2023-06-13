import { createPluginFromConfiguration } from '@helpers/createPluginFromConfiguration'

export const prefix = '/activity'

export const plugin = createPluginFromConfiguration({
  routes: [import('./log.post')]
})
