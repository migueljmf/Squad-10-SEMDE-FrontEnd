import { createRouter, createWebHistory } from "vue-router";

// Views
import LoginView from "../views/LoginView.vue";
import InicioView from "../views/InicioView.vue";
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

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", name: "Login", component: LoginView },
  { path: "/inicio", name: "Inicio", component: InicioView },
  { path: "/gestao-demandas", name: "GestaoDemandas", component: GestaoDemandasView },
  { path: "/acoes", name: "Acoes", component: AcoesView },
  { path: "/cadastrar-acao", name: "CadastrarAcao", component: CadastrarAcaoView },
  { path: "/tarefas", name: "Tarefas", component: TarefasView },
  { path: "/cadastrar-tarefa", name: "CadastrarTarefa", component: CadastrarTarefaView },
  { path: "/perfil", name: "PerfilUsuario", component: PerfilUsuarioView },
  { path: "/detalhe-tarefa/:id", name: "DetalheTarefa", component: DetalheTarefaView },
  { path: "/detalhe-acao/:id", name: "DetalheAcao", component: DetalheAcaoView },
  { path: "/editar-tarefa/:id", name: "EditarTarefa", component: EditarTarefaView },
  { path: "/gestao-demandas/favoritos", name: "FavoritosDemandas", component: FavoritosDemandasView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
