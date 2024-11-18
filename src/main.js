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
import './assets/css/scrollarea.css'
import './assets/css/panel.css'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueFeather from 'vue-feather'
import { MotionPlugin } from '@vueuse/motion'
import * as Sentry from '@sentry/vue'

import App from './App.vue'
import router from './router'
import { Auth0 } from './configs/auth'

const app = createApp(App)
app.component(VueFeather.name, VueFeather)
app.use(createPinia())
app.use(router)
app.use(MotionPlugin)
app.use(Auth0)

if (import.meta.env.VITE_APP_ENV !== 'development') {
  Sentry.init({
    app,
    dsn: import.meta.env.VITE_SENTRY_DSN,
    // eslint-disable-next-line no-undef
    release: `yugibinder/${__VUE_APP_VERSION__}`,
    environment: import.meta.env.VITE_APP_ENV,
    ignoreErrors: ['Navigation cancelled', 'NavigationDuplicated', /(code 40[1,3])/gm],
    integrations: [Sentry.browserTracingIntegration({ router }), Sentry.replayIntegration()],
    beforeSend(event) {
      // ignore error tracking for dev instances and only send for qa/staging/prod
      if (event.environment && event.environment === 'development') return

      return event
    },
    // Tracing
    tracesSampleRate: 0.2, //  Capture 20% of the transactions
    // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
    tracePropagationTargets: ['yugibinder.com'],
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0 // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  })
}

app.mount('#app')
