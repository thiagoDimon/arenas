import { defineStore } from 'pinia'
import apiClient from '@/services/apiClient' // Importe sua instância configurada do Axios
import router from '@/router' // Importe o router para redirecionar

export const useLoginStore = defineStore('login', {
  /**
   * State: Onde guardamos as informações.
   * - isLoggedIn: Um booleano que controla se o usuário está autenticado na UI.
   * - user: Um objeto para armazenar os dados do usuário logado (ex: nome, email).
   */
  state: () => ({
    isLoggedIn: false,
    user: null,
  }),

  /**
   * Getters: "Propriedades computadas" para a store.
   */
  getters: {
    isAuthenticated: (state) => state.isLoggedIn,
    currentUser: (state) => state.user,
  },

  /**
   * Actions: Onde fica a lógica de negócio (chamadas de API, etc.).
   */
  actions: {
    /**
     * Tenta fazer login com email e senha.
     */
    async login(email, password) {
      try {
        // 1. Chama o endpoint de login. O backend retornará um cookie HttpOnly em caso de sucesso.
        await apiClient.post('/user/login', { email, password });

        // 2. Se o login foi bem-sucedido, chama checkAuthStatus para buscar os dados
        //    do usuário e atualizar o estado da store.
        await this.checkAuthStatus();
        
        // 3. Redireciona para a home após o sucesso.
        router.push('/home');

      } catch (error) {
        // Em caso de erro, garante que o estado de login seja falso.
        this.isLoggedIn = false;
        this.user = null;
        console.error("Falha no login:", error);
        // Lança o erro para que o componente de UI possa tratá-lo (ex: mostrar uma mensagem).
        throw error;
      }
    },

    /**
     * Verifica se o usuário tem um cookie de sessão válido fazendo uma chamada
     * a um endpoint protegido que retorna os dados do usuário.
     * ESSENCIAL para restaurar o estado ao recarregar a página.
     */
    async checkAuthStatus() {
      try {
        // Crie um endpoint no seu backend como GET /api/me ou /api/users/profile
        // que retorne os dados do usuário autenticado.
        const response = await apiClient.get('/user/me');
        
        // Se a chamada for bem-sucedida, o usuário está logado.
        this.user = response.data;
        this.isLoggedIn = true;
      } catch (error) {
        // Se a chamada falhar (ex: 401), o cookie não é válido ou não existe.
        this.user = null;
        this.isLoggedIn = false;
      }
    },

    /**
     * Chama o endpoint de logout do backend para invalidar o cookie
     * e limpa o estado local.
     */
    async logout() {
      try {
        await apiClient.post('/user/logout');
      } finally {
        // Independentemente do resultado da chamada de API, limpa o estado do front-end.
        this.user = null;
        this.isLoggedIn = false;
        // Redireciona para a página de login.
        router.push('/');
      }
    },
  },
})