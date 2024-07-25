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
import piniaPersist from 'pinia-plugin-persistedstate';
import VueGoogleMaps from '@fawmi/vue-google-maps'

// Create Vue app
const app = createApp(App)

// Create Pinia instance
const pinia = createPinia();
pinia.use(piniaPersist);

// Use Pinia plugin
app.use(pinia)

// Use Vue Google Maps plugin
app.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAoHmQZTE554p1lMwpZ4jQ6YZSct6lFY8Q',
    // language: 'de',
  },
})

// Import and use router
import router from './router'
app.use(router)

// Register other plugins
registerPlugins(app)

// Mount the app
app.mount('#app')



// utility to verify local storage is enabled to save pinia in dev
function checkLocalStorage() {
  try {
    const testKey = 'test';
    const testValue = 'testValue';
    localStorage.setItem(testKey, testValue);
    const value = localStorage.getItem(testKey);
    localStorage.removeItem(testKey);

    if (value === testValue) {
      console.log('localStorage is enabled and working');
      return true;
    } else {
      console.error('localStorage is not working as expected');
      return false;
    }
  } catch (e) {
    console.error('localStorage is not supported or is disabled:', e);
    return false;
  }
}
checkLocalStorage();
