import api from "./api";

export async function login(email, password) {
  const res = await api.post("/auth/login", { email, password });
  localStorage.setItem("token", res.data.acessToken);
  return res.data;
}

export function logout() {
  localStorage.removeItem("token");
}
