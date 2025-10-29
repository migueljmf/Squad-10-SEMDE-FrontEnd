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
    component: InicioView
  },

  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardView
  },

  {
    path: "/gestao-demandas",
    name: "GestaoDemandas",
    component: GestaoDemandasView, 
  },

  {
    path: "/acoes",
    name: "Acoes",
    component: AcoesView,
  },

  {
    path: "/cadastrar-acao",
    name: "CadastrarAcao",
    component: CadastrarAcaoView, 
  },

  {
    path: "/tarefas",
    name: "Tarefas",
    component: TarefasView, 
  },

  {
    path: "/cadastrar-tarefa",
    name: "CadastrarTarefa",
    component: CadastrarTarefaView, 
  },

  {
    path: "/perfil",
    name: "PerfilUsuario",
    component: PerfilUsuarioView,
  },

  {
    path: "/detalhe-tarefa/:id",
    name: "DetalheTarefa",
    component: DetalheTarefaView,
  },

  {
    path: "/detalhe-acao/:id",
    name: "DetalheAcao",
    component: DetalheAcaoView, 
  },

  {
    path: "/editar-tarefa/:id",
    name: "EditarTarefa",
    component: EditarTarefaView, 
  },

  // Favoritos route removed
  { 
    path: "/financeiro", 
    name: "Financeiro", 
    component: FinanceiroView,
  },

  {
    path: "/eleicoes",
    name: "Eleicoes",
    component: EleicoesView,
  },

  {
    path: "/configuracoes",
    name: "Configuracoes",
    component: ConfiguracoesView,
  },
  {
    path: "/configuracoes/senha",
    name: "ConfiguracoesSenha",
    component: ConfiguracoesSenhaView,
  },
  {
    path: "/configuracoes/cadastro",
    name: "ConfiguracoesCadastro",
    component: ConfiguracoesCadastroView,
  },
  {
    path: "/configuracoes/usuarios",
    name: "ConfiguracoesUsuarios",
    component: ConfiguracoesUsuariosView,
  },

  {
    path: "/agente-ia",
    name: "AgenteIA",
    component: AgenteIAView,
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
