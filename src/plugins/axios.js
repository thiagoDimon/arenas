import axios from 'axios'

const baseURL
  = process.env.NODE_ENV === 'production'
    ? import.meta.env.VITE_API_URL
    : 'http://localhost:9090/'

const apiClient = axios.create({
  baseURL,
  headers: { 'Content-type': 'application/json' },
  withCredentials: true,
})

// Request Interceptor
apiClient.interceptors.request.use(
  config => {
    // Adicione token de autorização ou outros headers aqui, se necessário
    // config.headers.Authorization = `Bearer ${yourAuthToken}`;
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
    if (error.response && error.response.status === 401) {
      // Trate acesso não autorizado
    }
    return Promise.reject(error)
  },
)

export default apiClient
