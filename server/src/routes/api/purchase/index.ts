import { createPluginFromConfiguration } from '@helpers/createPluginFromConfiguration'

export const prefix = '/purchase'

export const plugin = createPluginFromConfiguration({
  routes: [
    import('./post'),
    import('./get'),
    import('./id.get'),
    import('./activate.post'),
    import('./payment-confirm.post'),
    import('./stats.get'),
    import('./cancel.post'),
    import('./pay.post'),
    import('./pay-cancel.post'),
    import('./payment-purpose.get')
  ]
})
