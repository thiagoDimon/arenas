import { createApp } from 'vue'
import { registerPlugins } from '@/plugins'
import App from './App.vue'
import 'unfonts.css'
import { useLoginStore } from '@/stores/login' 

async function initializeApp() {
    const app = createApp(App)
    registerPlugins(app)
    const loginStore = useLoginStore()
    await loginStore.checkAuthStatus()
    app.mount('#app')
}

initializeApp();