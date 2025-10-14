import { createPinia } from 'pinia'
export { useAuthStore } from './auth'
export { useDashboardStore } from './dashboard'
export { useLoginStore } from './login'
export { useUserStore } from './user'

export default createPinia()
