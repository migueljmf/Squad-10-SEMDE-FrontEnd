import axios from "axios";
import { notificationStore } from '@/stores/notificationStore'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  // rotas que devem sempre enviar token
  const protectedPrefixes = ['/address', '/contact', '/task', '/category', '/city', '/city/name'];

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  }

  // se a rota for protegida e não houver token, rejeitamos a requisição explicitamente
  const url = (config.url || '').toString();
  const isProtected = protectedPrefixes.some(prefix => url.startsWith(prefix) || url.includes(prefix));
  if (isProtected) {
    return Promise.reject(new Error('Autenticação necessária: token não encontrado.'));
  }

  // caso a rota não seja protegida, apenas segue sem Authorization
  return config;
});

export default api;
// interceptor global de respostas para tratar 401
api.interceptors.response.use(
  (resp) => {
    // se a API retornar uma mensagem amigável, exibimos
    try {
      const message = resp?.data?.message || resp?.data?.msg || null
      if (message && resp.config && /post|put|delete/i.test(resp.config.method)) {
        notificationStore.success(message)
      }
    } catch (e) {
      // noop
    }
    return resp;
  },
  (error) => {
    const status = error?.response?.status;
    try {
      const msg = error?.response?.data?.message || error?.response?.data?.msg || error?.message || 'Erro na requisição'
      notificationStore.error(msg)
    } catch (e) {
      // noop
    }

    if (status === 401) {
      try {
        localStorage.removeItem('token');
        // redireciona para login — assumimos rota /login
        window.location.href = '/login';
      } catch (e) {
        // noop
      }
    }
    return Promise.reject(error);
  }
);
