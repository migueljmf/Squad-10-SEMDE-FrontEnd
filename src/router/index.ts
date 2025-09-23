import { createRouter, createWebHistory } from "vue-router";

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
  { path: "/login", name: "Login", component: LoginView },
  { path: "/inicio", name: "Inicio", component: InicioView },
  { path: "/gestao-demandas", name: "GestaoDemandas", component: GestaoDemandasView },
  { path: "/acoes", name: "Acoes", component: AcoesView },
  { path: "/cadastrar-acao", name: "CadastrarAcao", component: CadastrarAcaoView },
  { path: "/tarefas", name: "Tarefas", component: TarefasView },
  { path: "/cadastrar-tarefa", name: "CadastrarTarefa", component: CadastrarTarefaView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
