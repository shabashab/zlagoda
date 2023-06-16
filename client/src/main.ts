import './style.css'
// import './themes/light/theme.scss'
import 'primevue/resources/themes/soho-light/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ConfirmationService from 'primevue/confirmationservice'

import PrimeVue from 'primevue/config'

import App from './App.vue'
import i18n from './plugins/i18n'
import { router } from './router'
// import './assets/fonts'

const app = createApp(App)

app.use(router)
app.use(i18n)
app.use(createPinia())
app.use(PrimeVue)
app.use(ConfirmationService)

app.mount('#app')
