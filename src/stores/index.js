import { createPinia } from 'pinia'
export { useAuthStore } from './auth'
export { useCalendarStore } from './calendar'
export { useDashboardStore } from './dashboard'
export { useLoginStore } from './login'
export { useMatchStore } from './match'
export { useUserStore } from './user'

export default createPinia()
