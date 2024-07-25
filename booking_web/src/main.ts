/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'

import VueGoogleMaps from '@fawmi/vue-google-maps'

const pinia = createPinia()
const app = createApp(App)

app.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyAoHmQZTE554p1lMwpZ4jQ6YZSct6lFY8Q',
        // language: 'de',
    },
})

app.use(router);

registerPlugins(app)

app.use(pinia)

app.mount('#app')
