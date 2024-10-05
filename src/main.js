import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { injectSpeedInsights } from "@vercel/speed-insights/vue"
import { inject } from '@vercel/analytics';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

inject();
injectSpeedInsights();