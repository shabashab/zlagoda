import { createPluginFromConfiguration } from '@helpers/createPluginFromConfiguration'

export const prefix = '/password-restore'

export const plugin = createPluginFromConfiguration({
  routes: [import('./post'), import('./confirm.post'), import('./verify.get')]
})
