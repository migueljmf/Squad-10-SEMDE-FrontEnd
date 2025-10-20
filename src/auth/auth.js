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

export function hasPermission(key) {
  // Returns true if the current user has permission for the given key.
  // Assumptions:
  // - If there is no token (development mode), return true so developer can see everything.
  // - 'ADMIN' role has all permissions.
  // - The token payload may include a 'permissions' field which can be either
  //   an array of keys or an object map { key: true }.
  const user = getUser();
  if (!user) return true;
  if (user.role === "ADMIN") return true;
  const perms = user.permissions;
  if (perms) {
    if (Array.isArray(perms)) return perms.includes(key);
    if (typeof perms === "object") return !!perms[key];
  }

  // Fallback: check local permissions stored by role in localStorage
  try {
    const stored = localStorage.getItem("app_role_permissions");
    if (stored) {
      const parsed = JSON.parse(stored);
      const role = user.role || "USER";
      const rolePerms = parsed[role];
      if (rolePerms) return !!rolePerms[key];
    }
  } catch (e) {
    // ignore
  }

  return false;
}
