import axios from 'axios';

// 1. Cria uma instância configurada do Axios.
// É uma boa prática usar uma instância em vez do axios global.
const apiClient = axios.create({
  baseURL: 'http://localhost:9090', // Aponte para a nova porta do backend
  withCredentials: true,
});
// Opcional: Você pode adicionar "interceptors" aqui no futuro para lidar
// com a lógica de refresh token ou erros globais, como fizemos na discussão anterior.

apiClient.interceptors.response.use(
  // A primeira função é para respostas de SUCESSO (status 2xx).
  // Não fazemos nada, apenas retornamos a resposta para quem a chamou.
  (response) => {
    return response;
  },

  // A segunda função é para respostas de ERRO. É aqui que tratamos a expiração.
  async (error) => {
    const originalRequest = error.config;

    // 2. VERIFICAÇÃO DO ERRO
    // Verifica se o erro é um 401 (Token Expirado/Inválido)
    // e se ainda não tentamos renovar o token para esta mesma requisição.
    // A flag `_retry` é uma propriedade customizada que adicionamos para evitar um loop infinito.
    if (error.response.status === 401 && !originalRequest._retry) {
      
      originalRequest._retry = true; // Marca a requisição para não tentar renovar de novo

      try {
        // 3. TENTATIVA DE RENOVAÇÃO
        // Faz uma chamada silenciosa para o endpoint de refresh.
        // O navegador enviará automaticamente o cookie 'refresh-token'.
        await apiClient.post('/user/refresh-token'); // Ajuste a URL se for diferente
        
        // Se a chamada acima funcionou, o backend já nos deu um novo 'access-token'
        // no cookie. O navegador o armazena automaticamente.
        console.log('Token renovado com sucesso! Tentando novamente a requisição original.');

        // 4. RETENTATIVA DA REQUISIÇÃO ORIGINAL
        // Agora, refazemos a requisição que tinha falhado (ex: GET /user/me).
        // Desta vez, o navegador usará o NOVO 'access-token'.
        return apiClient(originalRequest);

      } catch (refreshError) {
        // 5. FALHA NA RENOVAÇÃO
        // Se a renovação falhar, significa que o 'refresh-token' também é inválido.
        // Neste caso, a sessão do usuário acabou de vez.
        console.error('Não foi possível renovar a sessão. Deslogando o usuário.', refreshError);
        
        // Usamos a store para limpar o estado e redirecionar para o login.
        const loginStore = useLoginStore();
        loginStore.logout();
        
        // Rejeitamos a promise para que o chamador original saiba que falhou.
        return Promise.reject(refreshError);
      }
    }

    // Para qualquer outro erro (ex: 404, 500), apenas o repassamos.
    return Promise.reject(error);
  }
);

export default apiClient;