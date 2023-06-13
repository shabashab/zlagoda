import { createPluginFromConfiguration } from 'helpers/createPluginFromConfiguration'

export const prefix = '/withdrawals'

export const plugin = createPluginFromConfiguration({
  routes: [import('./get'), import('./accept.post'), import('./cancel.post')]
})
