import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import './assets/main.scss'

import PrimeVue from 'primevue/config'
import { primeVueConfig } from '@/config/primeVueConfig.js'
import ToastService from 'primevue/toastservice'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// primevue - BEGIN
app.use(PrimeVue, primeVueConfig)
app.use(ToastService)
// primevue - END

app.mount('#app')
