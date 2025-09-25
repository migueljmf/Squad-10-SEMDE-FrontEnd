import { jwtDecode } from "jwt-decode";


export function getToken() {
  return localStorage.getItem("token");
}

export function getUser() {
  const token = getToken();
  if (!token) return null;

  try {
    return jwtDecode(token); 
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  const user = getUser();
  if (!user) return false;

  const now = Date.now() / 1000;
  return user.exp && user.exp > now;
}

export function hasRole(requiredRole) {
  const user = getUser();
  return user && user.role === requiredRole;
}
