import { createPluginFromConfiguration } from '@helpers/createPluginFromConfiguration'

export const prefix = '/admin'

export const plugin = createPluginFromConfiguration({
  routes: [import('./dashboard.get'), import('./withdrawals/get')],
  plugins: [
    import('./withdrawals'),
    import('./users'),
    import('./deposits'),
    import('./referal')
  ]
})
