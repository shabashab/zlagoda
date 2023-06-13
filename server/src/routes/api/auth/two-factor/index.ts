import { createPluginFromConfiguration } from '@helpers/createPluginFromConfiguration'

export const prefix = '/two-factor'

export const plugin = createPluginFromConfiguration({
  routes: [
    import('./enable.patch'),
    import('./post'),
    import('./delete'),
    import('./get'),
    import('./required.get')
  ]
})
