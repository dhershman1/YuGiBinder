import './assets/css/main.css'
import './assets/css/nav.css'
import './assets/css/brand.css'
import './assets/css/card.css'
import './assets/css/tags.css'
import './assets/css/button.css'
import './assets/css/select.css'
import './assets/css/radix-nav.css'
import './assets/css/radix-dialog.css'
import './assets/css/tabs.css'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createAuth0 } from '@auth0/auth0-vue'
import VueFeather from 'vue-feather'
import { MotionPlugin } from '@vueuse/motion'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component(VueFeather.name, VueFeather)
app.use(createPinia())
app.use(
  createAuth0({
    domain: import.meta.env.VITE_VUE_APP_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_VUE_APP_AUTH0_CLIENT_ID,
    authorizationParams: {
      redirect_uri: window.location.origin
    }
  })
)
app.use(router)
app.use(MotionPlugin)

app.mount('#app')
