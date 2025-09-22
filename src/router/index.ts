import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

// importando as telas
import LoginView from "../views/LoginView.vue";
import InicioView from "../views/InicioView.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: "/login" },
  { path: "/login", name: "Login", component: LoginView },
  { path: "/inicio", name: "Inicio", component: InicioView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

