import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated, hasRole } from '../auth/auth.js'


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
import FinanceiroView from "../views/FinanceiroView.vue";
import EleicoesView from '../views/EleicoesView.vue'; 
import ConfiguracoesView from "../views/ConfiguracoesView.vue";
import ConfiguracoesSenhaView from "../views/ConfiguracoesSenhaView.vue";
import ConfiguracoesCadastroView from "../views/ConfiguracoesCadastroView.vue";
import ConfiguracoesUsuariosView from "../views/ConfiguracoesUsuariosView.vue";
import AgenteIAView from "../views/AgenteIAView.vue";

const routes = [
  { path: "/", redirect: "/inicio" },

  { path: "/login", name: "Login", component: LoginView },

  {
    path: "/inicio",
    name: "Inicio",
    component: InicioView,
    meta: { requiresAuth: true} 
  },

  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardView,
    meta: { requiresAuth: true}
  },

  {
    path: "/gestao-demandas",
    name: "GestaoDemandas",
    component: GestaoDemandasView,
    meta: { requiresAuth: true} 
  },

  {
    path: "/acoes",
    name: "Acoes",
    component: AcoesView,
    meta: { requiresAuth: true, role: ["PARLIAMENTARY","ADMIN"] }
  },

  {
    path: "/cadastrar-acao",
    name: "CadastrarAcao",
    component: CadastrarAcaoView,
    meta: { requiresAuth: true, role: "PARLIAMENTARY" } 
  },

  {
    path: "/tarefas",
    name: "Tarefas",
    component: TarefasView, 
    meta: { requiresAuth: true}
  },

  {
    path: "/cadastrar-tarefa",
    name: "CadastrarTarefa",
    component: CadastrarTarefaView,
    meta: { requiresAuth: true, role: "ADVISOR" } 

  },

  {
    path: "/perfil",
    name: "PerfilUsuario",
    component: PerfilUsuarioView,
    meta: { requiresAuth: true}
  },

  {
    path: "/detalhe-tarefa/:id",
    name: "DetalheTarefa",
    component: DetalheTarefaView,
    meta: { requiresAuth: true}
  },

  {
    path: "/detalhe-acao/:id",
    name: "DetalheAcao",
    component: DetalheAcaoView,
    meta: { requiresAuth: true, role: ["PARLIAMENTARY","ADMIN"] } 
  },

  {
    path: "/editar-tarefa/:id",
    name: "EditarTarefa",
    component: EditarTarefaView, 
    meta: { requiresAuth: true, role: "ADVISOR" }
  },

  // Favoritos route removed
  { 
    path: "/financeiro", 
    name: "Financeiro", 
    component: FinanceiroView,
    meta: { requiresAuth: true, role: ["PARLIAMENTARY","ADMIN"] }
  },

  {
    path: "/eleicoes",
    name: "Eleicoes",
    component: EleicoesView,
    meta: { requiresAuth: true }
  },

  {
    path: "/configuracoes",
    name: "Configuracoes",
    component: ConfiguracoesView,
    meta: { requiresAuth: true }
  },
  {
    path: "/configuracoes/senha",
    name: "ConfiguracoesSenha",
    component: ConfiguracoesSenhaView,
    meta: { requiresAuth: true }
  },
  {
    path: "/configuracoes/cadastro",
    name: "ConfiguracoesCadastro",
    component: ConfiguracoesCadastroView,
    meta: { requiresAuth: true , role: "ADMIN"}
  },
  {
    path: "/configuracoes/usuarios",
    name: "ConfiguracoesUsuarios",
    component: ConfiguracoesUsuariosView,
    meta: { requiresAuth: true , role: "ADMIN"}
  },

  {
    path: "/agente-ia",
    name: "AgenteIA",
    component: AgenteIAView,
    meta: { requiresAuth: true, role:"PARLIAMENTARY"  }
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
