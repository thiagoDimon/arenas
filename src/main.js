import { createApp } from 'vue'
import { registerPlugins } from '@/plugins'
import App from './App.vue'
import 'unfonts.css'

async function initializeApp () {
  const app = createApp(App)
  registerPlugins(app)
  app.mount('#app')
}

try {
  await initializeApp()
} catch (error) {
  console.error(error)
}
