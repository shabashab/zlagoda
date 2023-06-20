import { createPluginFromConfiguration } from '@helpers/createPluginFromConfiguration'

export const prefix = '/customers'

export const plugin = createPluginFromConfiguration({
  routes: [
    import('./get'),
    import('./id.get'),
    import('./id.patch'),
    import('./post')
  ]
})
