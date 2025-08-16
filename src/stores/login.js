import { defineStore } from 'pinia'
// import axios from '@/plugins/axios'

export const useLoginStore = defineStore('login', {
  state: () => ({
    // usuario: {
    //   id: null,
    //   nome: null,
    //   email: null,
    // },
  }),
  actions: {
    async login (username, password, lembreMe = false) {
      console.log('username:', username, 'password:', password, 'lembreMe:', lembreMe)
      // const token = axios.post('/login', { username, password })
    },
    async loginGoogle () {
      console.log('Logging in with Google')
    },
  },
  mutations: {
    // setUsuario(state, usuario) {
    //   state.usuario = usuario;
    // },

    // limparUsuario(state) {
    //   state.usuario = { id: null, nome: null, email: null };

    // setNomeUsuario(state, nome) {
    //   if (state.usuario) { state.usuario.nome = nome;
  },
})
