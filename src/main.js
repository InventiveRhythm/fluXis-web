import { createApp } from 'vue'
import VueCookies from 'vue-cookies'
import App from './App.vue'
import router from './router'

import './assets/main.scss'
import './assets/tailwind.css'

const app = createApp(App)
app.use(VueCookies, { expires: '2y' }) // 2 years because why not
app.use(router)
app.mount('#app')