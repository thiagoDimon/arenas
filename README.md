# Arenas

Frontend responsivo para o Arenas — Progressive Web App para criação e gerenciamento de partidas de futebol.

## 🚀 Tecnologias Utilizadas

- [Vue 3](https://vuejs.org/) + [Vite](https://vite.dev/)
- [Vuetify 3](https://vuetifyjs.com/) - UI Framework
- [Pinia](https://pinia.vuejs.org/) - Gerenciamento de estado
- [Vue Router](https://router.vuejs.org/) - Rotas
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) - Padronização e qualidade de código
- [Sass](https://sass-lang.com/) - Pré-processador CSS

## 📁 Estrutura do Projeto

- `src/` — Código fonte principal
  - `components/` — Componentes Vue globais
  - `layouts/` — Layouts reutilizáveis
  - `pages/` — Páginas da aplicação
  - `plugins/` — Plugins globais
  - `router/` — Configuração de rotas
  - `stores/` — Stores Pinia
  - `styles/` — Configurações de estilos e variáveis
  - `assets/` — Imagens e arquivos estáticos
- `public/` — Arquivos públicos
- Configurações: [`vite.config.mjs`](vite.config.mjs), [`jsconfig.json`](jsconfig.json), [`eslint.config.js`](eslint.config.js), [`.editorconfig`](.editorconfig), [`.browserslistrc`](.browserslistrc)

## ⚙️ Configurações Importantes

- Alias `@` aponta para `src/`
- ESLint configurado com [eslint-config-vuetify](eslint.config.js)
- EditorConfig para padronização [.editorconfig](.editorconfig)
- Auto-imports de APIs Vue, Pinia e Vue Router [.eslintrc-auto-import.json](.eslintrc-auto-import.json)
- Plugins automáticos para componentes, layouts e rotas

## 🖥️ Como Rodar o Projeto

### Pré-requisitos

- Node.js 20.19.0 ou superior
- npm instalado

### Passos

1. Clone o projeto:

   ```bash
   git clone <url-do-repo>
   cd ArenasFrontend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

   Acesse [http://localhost:8080](http://localhost:8080) no navegador.

## 🛠️ Comandos Úteis

- **Build de produção:**
  ```bash
  npm run build
  ```
- **Preview do build:**
  ```bash
  npm run preview
  ```
- **Lint e correção automática:**
  ```bash
  npm run lint
  ```
- **Formatar código (se configurado):**
  ```bash
  npm run format
  ```

## 📚 Links Úteis

- [Documentação do Vuetify](https://vuetifyjs.com/)
- [Documentação do Pinia](https://pinia.vuejs.org/)
- [Documentação do Vue Router](https://router.vuejs.org/)
- [Documentação dos Plugins](https://github.com/unplugin/unplugin-vue-components)
- [Documentação dos Layouts](https://github.com/loicduong/vite-plugin-vue-layouts-next)

---
<br>

<p align="center">
  <img src="https://raw.githubusercontent.com/github/explore/main/topics/javascript/javascript.png" alt="JavaScript" height="60"/>&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://vuejs.org/images/logo.png" alt="Vue.js" height="60"/>&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/vitejs/vite/main/docs/public/logo.svg" alt="Vite" height="60"/> &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://pinia.vuejs.org/logo.svg" alt="Pinia" height="60"/>
</p>