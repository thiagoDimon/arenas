import axios from 'axios'
import { refreshToken } from '@/plugins/tokenService'

const baseURL
  = process.env.NODE_ENV === 'production'
    ? import.meta.env.VITE_API_URL
    : 'https://arenas-backend.gustavotbett.com.br'

const apiClient = axios.create({
  baseURL,
  headers: { 'Content-type': 'application/json' },
  withCredentials: true,
})

// Request Interceptor
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

// Response Interceptor
apiClient.interceptors.response.use(
  response => {
    return response
  },
  error => {
    // Trate códigos de erro específicos ou exiba notificações
    console.error('Erro na resposta da API:', error)
    const originalRequest = error.config
    if (
      error.response
      && error.response.status === 401
      && !originalRequest._retry
      && !originalRequest.url.includes('/auth/refresh-token')
    ) {
      originalRequest._retry = true
      return refreshToken().then(newToken => {
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`
          return apiClient.request(originalRequest)
        }
        throw error
      }).catch(() => {
        // Se não conseguir renovar, rejeita o erro original
        throw error
      })
    }
    return Promise.reject(error)
  },
)

export default apiClient
