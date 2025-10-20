import { createRouter, createWebHistory } from "vue-router";
import { isAuthenticated, hasRole } from "../auth/auth";

// Views
import LoginView from "../views/LoginView.vue";
import InicioView from "../views/InicioView.vue";
import DashboardView from "../views/DashboardView.vue";
import GestaoDemandasView from "../views/GestaoDemandasView.vue";
import AcoesView from "../views/AcoesView.vue";
import CadastrarAcaoView from "../views/CadastrarAcaoView.vue";
import TarefasView from "../views/TarefasView.vue";
import CadastrarTarefaView from "../views/CadastrarTarefaView.vue";
import PerfilUsuarioView from "../views/PerfilUsuarioView.vue";
import DetalheTarefaView from "../views/DetalheTarefaView.vue";
import DetalheAcaoView from "../views/DetalheAcaoView.vue";
import EditarTarefaView from "../views/EditarTarefaView.vue";
import FavoritosDemandasView from "../views/FavoritosDemandasView.vue";
import FinanceiroView from "../views/FinanceiroView.vue";
import ConfiguracoesView from "../views/ConfiguracoesView.vue";

const routes = [
  { path: "/", redirect: "/inicio" },

  { path: "/login", name: "Login", component: LoginView },

  {
    path: "/inicio",
    name: "Inicio",
    component: InicioView,
  },

  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardView,
  },

  {
    path: "/gestao-demandas",
    name: "GestaoDemandas",
    component: GestaoDemandasView,
    // meta: { requiresAuth: true, role: "ADMIN" }
  },

  {
    path: "/acoes",
    name: "Acoes",
    component: AcoesView,
    // meta: { requiresAuth: true }
  },

  {
    path: "/cadastrar-acao",
    name: "CadastrarAcao",
    component: CadastrarAcaoView,
    // meta: { requiresAuth: true, role: "ADMIN" }
  },

  {
    path: "/tarefas",
    name: "Tarefas",
    component: TarefasView,
    // meta: { requiresAuth: true }
  },

  {
    path: "/cadastrar-tarefa",
    name: "CadastrarTarefa",
    component: CadastrarTarefaView,
    // meta: { requiresAuth: true }
  },

  // Rotas adicionadas
  {
    path: "/perfil",
    name: "PerfilUsuario",
    component: PerfilUsuarioView,
    // meta: { requiresAuth: true }
  },

  {
    path: "/detalhe-tarefa/:id",
    name: "DetalheTarefa",
    component: DetalheTarefaView,
    // meta: { requiresAuth: true }
  },

  {
    path: "/detalhe-acao/:id",
    name: "DetalheAcao",
    component: DetalheAcaoView,
    // meta: { requiresAuth: true }
  },

  {
    path: "/editar-tarefa/:id",
    name: "EditarTarefa",
    component: EditarTarefaView,
    // meta: { requiresAuth: true, role: "ADMIN" }
  },

  {
    path: "/gestao-demandas/favoritos",
    name: "FavoritosDemandas",
    component: FavoritosDemandasView,
    // meta: { requiresAuth: true }
  },
  {
    path: "/financeiro",
    name: "Financeiro",
    component: FinanceiroView,
    // meta: { requiresAuth: true }
  },

  {
    path: "/configuracoes",
    name: "Configuracoes",
    component: ConfiguracoesView,
    // meta: { requiresAuth: true }
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
