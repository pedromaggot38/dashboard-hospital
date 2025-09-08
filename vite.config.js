import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';
import process from 'node:process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// A configuração agora é uma função para acessar as variáveis de ambiente do Vite
export default defineConfig(({ mode }) => {
  // Carrega as variáveis de ambiente do arquivo .env com base no modo (development, production)
  const env = loadEnv(mode, process.cwd(), '');

  // Validação para garantir que a variável de ambiente essencial existe
  if (!env.VITE_API_BASE_URL) {
    throw new Error(
      'A variável de ambiente VITE_API_BASE_URL não está definida no arquivo .env'
    );
  }

  // Analisa a URL da API para separar o endereço do servidor do caminho base
  const apiBaseUrl = new URL(env.VITE_API_BASE_URL);
  const apiTarget = apiBaseUrl.origin; // Ex: 'http://localhost:3000'
  const apiBasePath = apiBaseUrl.pathname; // Ex: '/api/v1/admin'

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      proxy: {
        // Regra para as rotas de autenticação
        '/auth': {
          target: apiTarget, // Usa o endereço do servidor lido do .env
          changeOrigin: true,
          // Reescreve a URL: '/auth/check-root' se torna '/api/v1/admin/auth/check-root'
          rewrite: (path) => path.replace(/^\/auth/, `${apiBasePath}/auth`),
        },
        // Regra para as rotas de usuários
        '/users': {
          target: apiTarget, // Usa o mesmo endereço do servidor
          changeOrigin: true,
          // Reescreve a URL: '/users/me' se torna '/api/v1/admin/users/me'
          rewrite: (path) => path.replace(/^\/users/, `${apiBasePath}/users`),
        },
      },
    },
  };
});
