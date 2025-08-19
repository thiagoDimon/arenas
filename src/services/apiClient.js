import axios from 'axios';

// 1. Cria uma instância configurada do Axios.
// É uma boa prática usar uma instância em vez do axios global.
const apiClient = axios.create({
  baseURL: 'http://localhost:9090', // Aponte para a nova porta do backend
  withCredentials: true,
});
// Opcional: Você pode adicionar "interceptors" aqui no futuro para lidar
// com a lógica de refresh token ou erros globais, como fizemos na discussão anterior.


// 4. Exporta a instância configurada para que possa ser usada em outras partes da aplicação.
export default apiClient;