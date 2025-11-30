import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/pages/login/index.vue'),
  },
  {
    path: '/novo-usuario',
    name: 'NovoUsuario',
    component: () => import('@/pages/login/novo_usuario/index.vue'),
  },
  {
    path: '/redirect',
    name: 'Redirect',
    component: () => import('@/pages/login/Redirect.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/pages/home/index.vue'),
  },
  {
    path: '/calendario',
    name: 'Calendario',
    component: () => import('@/pages/calendario/index.vue'),
  },
  {
    path: '/partidas',
    name: 'Partidas',
    children: [
      {
        path: 'procurar',
        name: 'Procurar Partidas',
        component: () => import('@/pages/partidas/ProcurarPartidas.vue'),
      },
      {
        path: 'criar',
        name: 'Criar Partidas',
        component: () => import('@/pages/partidas/CriarPartidas.vue'),
      },
      {
        path: 'gerenciar',
        name: 'Gerenciar Partidas',
        component: () => import('@/pages/partidas/GerenciarPartidas.vue'),
      },
    ],
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: () => import('@/pages/perfil/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/login/index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.logado

  const rotasPublicas = ['Login', 'Redirect', 'NovoUsuario']

  if (!rotasPublicas.includes(to.name) && !isAuthenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (localStorage.getItem('vuetify:dynamic-reload')) {
      console.error('Dynamic import error, reloading page did not fix it', err)
    } else {
      console.info('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
