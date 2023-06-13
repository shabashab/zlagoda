import { createPluginFromConfiguration } from '@helpers/createPluginFromConfiguration'

export const prefix = '/referal'

export const plugin = createPluginFromConfiguration({
  routes: [
    import('./referers.get'),
    import('./referer.get'),
    import('./user.get')
  ]
})
