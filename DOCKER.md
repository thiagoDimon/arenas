# 🐳 Guia de Deploy com Docker

Este documento descreve como fazer o deploy da aplicação Arenas usando Docker e Nginx.

## 📋 Pré-requisitos

- Docker instalado (versão 20.10 ou superior)
- Docker Compose instalado (versão 2.0 ou superior)
- Arquivo `.env` configurado com as variáveis necessárias

## 🔧 Configuração Inicial

### 1. Criar arquivo `.env`

Copie o arquivo `.env-example` para `.env` e preencha com os valores corretos:

```bash
cp .env-example .env
```

Edite o arquivo `.env` com suas configurações:

```env
VITE_API_URL=https://api.seudominio.com
VITE_API_BASE_URL=https://api.seudominio.com
VITE_GOOGLE_MAPS_API_KEY=sua_chave_google_maps_aqui
BASE_URL=/
```

**⚠️ Importante:** As variáveis de ambiente são injetadas no momento do build. Se você alterar o `.env` após o build, será necessário reconstruir a imagem.

## 🚀 Deploy com Docker Compose (Recomendado)

### Build e Iniciar

```bash
docker-compose up -d --build
```

Este comando irá:
1. Construir a imagem Docker com o build da aplicação
2. Iniciar o container na porta 80
3. Executar em modo daemon (background)

### Verificar Status

```bash
docker-compose ps
```

### Ver Logs

```bash
docker-compose logs -f frontend
```

### Parar o Container

```bash
docker-compose down
```

### Reconstruir após mudanças

```bash
docker-compose up -d --build --force-recreate
```

## 🐳 Deploy com Docker (Manual)

### 1. Build da Imagem

```bash
docker build \
  --build-arg VITE_API_URL=${VITE_API_URL} \
  --build-arg VITE_API_BASE_URL=${VITE_API_BASE_URL} \
  --build-arg VITE_GOOGLE_MAPS_API_KEY=${VITE_GOOGLE_MAPS_API_KEY} \
  --build-arg BASE_URL=${BASE_URL:-/} \
  -t arenas-frontend:latest .
```

Ou usando o arquivo `.env`:

```bash
export $(cat .env | xargs)
docker build \
  --build-arg VITE_API_URL=$VITE_API_URL \
  --build-arg VITE_API_BASE_URL=$VITE_API_BASE_URL \
  --build-arg VITE_GOOGLE_MAPS_API_KEY=$VITE_GOOGLE_MAPS_API_KEY \
  --build-arg BASE_URL=${BASE_URL:-/} \
  -t arenas-frontend:latest .
```

### 2. Executar o Container

```bash
docker run -d \
  --name arenas-frontend \
  -p 80:80 \
  --restart unless-stopped \
  arenas-frontend:latest
```

### 3. Verificar Status

```bash
docker ps
docker logs arenas-frontend
```

### 4. Parar e Remover

```bash
docker stop arenas-frontend
docker rm arenas-frontend
```

## 🔒 Configuração HTTPS (Produção)

Para produção, recomenda-se usar HTTPS. Existem algumas opções:

### Opção 1: Nginx Reverse Proxy com Let's Encrypt

Use um nginx reverso proxy externo com certificados SSL (Let's Encrypt) que redireciona para o container na porta 80.

### Opção 2: Certificados SSL no Container

Modifique o `nginx.conf` para incluir configuração SSL e monte os certificados como volumes:

```nginx
server {
    listen 443 ssl http2;
    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;
    # ... resto da configuração
}

server {
    listen 80;
    return 301 https://$host$request_uri;
}
```

E no `docker-compose.yml`:

```yaml
volumes:
  - ./ssl:/etc/nginx/ssl:ro
```

## 📊 Healthcheck

O container possui um healthcheck configurado que verifica o endpoint `/health` a cada 30 segundos. Você pode verificar o status com:

```bash
docker inspect --format='{{.State.Health.Status}}' arenas-frontend
```

## 🔍 Troubleshooting

### Container não inicia

1. Verifique os logs: `docker-compose logs frontend`
2. Verifique se a porta 80 está disponível: `netstat -tuln | grep 80`
3. Verifique se o `.env` está configurado corretamente

### Build falha

1. Verifique se todas as variáveis de ambiente estão definidas
2. Verifique se o Node.js está funcionando: `docker run --rm node:20-alpine node --version`
3. Limpe o cache do Docker: `docker builder prune`

### Aplicação não carrega

1. Verifique se o build foi concluído com sucesso
2. Verifique os logs do nginx: `docker exec arenas-frontend nginx -t`
3. Verifique se os arquivos foram copiados: `docker exec arenas-frontend ls -la /usr/share/nginx/html`

## 📝 Variáveis de Ambiente

| Variável | Descrição | Obrigatória | Padrão |
|----------|-----------|-------------|--------|
| `VITE_API_URL` | URL completa da API em produção | Sim | - |
| `VITE_API_BASE_URL` | URL base da API (OAuth2) | Sim | - |
| `VITE_GOOGLE_MAPS_API_KEY` | Chave da API do Google Maps | Não | - |
| `BASE_URL` | Base URL da aplicação | Não | `/` |

## 🎯 Estrutura dos Arquivos Docker

- `Dockerfile`: Define o processo de build multi-stage
- `docker-compose.yml`: Orquestração do container
- `nginx.conf`: Configuração do servidor web
- `.dockerignore`: Arquivos excluídos do build
- `.env-example`: Template de variáveis de ambiente

## 📚 Recursos Adicionais

- [Documentação Docker](https://docs.docker.com/)
- [Documentação Docker Compose](https://docs.docker.com/compose/)
- [Documentação Nginx](https://nginx.org/en/docs/)

