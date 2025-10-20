import api from "./api";

function resolverToken(data) {
  if (!data) return null;
  const { accessToken, token, acessToken } = data;
  return accessToken ?? token ?? acessToken ?? null;
}

export async function login(email, password) {
  const res = await api.post("/auth/login", { email, password });
  const token = resolverToken(res.data);

  if (!token) {
    throw new Error("Token ausente na resposta do servidor.");
  }

  localStorage.setItem("token", token);
  return res.data;
}

export function logout() {
  localStorage.removeItem("token");
}
