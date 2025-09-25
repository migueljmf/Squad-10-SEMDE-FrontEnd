import { createRouter, createWebHistory } from "vue-router";
import { isAuthenticated, hasRole } from "../auth/auth";


// Views
import LoginView from "../views/LoginView.vue";
import InicioView from "../views/InicioView.vue";
import GestaoDemandasView from "../views/GestaoDemandasView.vue";
import AcoesView from "../views/AcoesView.vue";
import CadastrarAcaoView from "../views/CadastrarAcaoView.vue";
import TarefasView from "../views/TarefasView.vue";
import CadastrarTarefaView from "../views/CadastrarTarefaView.vue";

const routes = [
  { path: "/", redirect: "/login" },

  { 
    path: "/login", 
    name: "Login", 
    component: LoginView 
  },

  { 
    path: "/inicio", 
    name: "Inicio", 
    component: InicioView,
    meta: { requiresAuth: true } 
  },

  { 
    path: "/gestao-demandas", 
    name: "GestaoDemandas", 
    component: GestaoDemandasView,
    //meta: { requiresAuth: true, role: "ADMIN" } 
  },

  { 
    path: "/acoes", 
    name: "Acoes", 
    component: AcoesView,
    //meta: { requiresAuth: true } 
  },

  { 
    path: "/cadastrar-acao", 
    name: "CadastrarAcao", 
    component: CadastrarAcaoView,
    //meta: { requiresAuth: true, role: "ADMIN" } 
  },

  { 
    path: "/tarefas", 
    name: "Tarefas", 
    component: TarefasView,
    //meta: { requiresAuth: true } 
  },

  { 
    path: "/cadastrar-tarefa", 
    name: "CadastrarTarefa", 
    component: CadastrarTarefaView,
    //meta: { requiresAuth: true } 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    return next("/login");
  }

  if (to.meta.role && !hasRole(to.meta.role)) {
    return next("/login"); 
  }

  next();
});
export default router;
