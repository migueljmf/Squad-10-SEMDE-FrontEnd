import axios from "axios";

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
  (resp) => resp,
  (error) => {
    const status = error?.response?.status;
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
