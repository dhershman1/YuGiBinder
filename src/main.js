import './assets/css/main.css'
import './assets/css/nav.css'
import './assets/css/brand.css'
import './assets/css/card.css'
import './assets/css/tags.css'
import './assets/css/button.css'
import './assets/css/select.css'
import './assets/css/radix-nav.css'
import './assets/css/radix-dialog.css'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueFeather from 'vue-feather'
import { MotionPlugin } from '@vueuse/motion'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component(VueFeather.name, VueFeather)
app.use(createPinia())
app.use(router)
app.use(MotionPlugin)

app.mount('#app')
