<template>
  <div id="app">
    <!-- Sidebar (oculta na tela de login) -->
    <TheSidebar v-if="mostrarSidebar" />

    <main class="main-content" :class="{ 'no-sidebar': !mostrarSidebar, 'with-header': mostrarHeader }">
      <!-- Header oculto em login -->
      <TheHeader v-if="mostrarHeader" :titulo="tituloPagina" :fotoUsuario="fotoUsuario" />

      <!-- Conteudo das rotas -->
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import TheHeader from "./components/TheHeader.vue";
import TheSidebar from "./components/TheSidebar.vue";

const route = useRoute();
const fotoUsuario = ref("");

const mostrarSidebar = computed(() => route.path !== "/login");
const mostrarHeader = computed(() => route.path !== "/login");

const tituloPagina = computed(() => {
  const pathMap = {
    "/login": "Login",
    "/inicio": "Inicio",
    "/dashboard": "Dashboard",
    "/gestao-demandas": "Gestao de Demandas",
    "/acoes": "Acoes",
    "/cadastrar-acao": "Cadastrar Acao",
    "/tarefas": "Tarefas",
    "/cadastrar-tarefa": "Cadastrar Tarefa",
    "/perfil": "Perfil do Usuario",
    "/financeiro": "Financeiro",
    "/eleicoes": "Eleicoes",
    "/configuracoes": "Configuracoes",
  };

  const nameMap = {
    GestaoDemandas: "Gestao de Demandas",
    FavoritosDemandas: "Favoritos",
    DetalheTarefa: "Detalhe da Tarefa",
    DetalheAcao: "Detalhe da Acao",
    EditarTarefa: "Editar Demanda",
    PerfilUsuario: "Perfil do Usuario",
  };

  return nameMap[route.name] || pathMap[route.path] || "Gestao de Demandas";
});
</script>

<style>
#app {
  display: flex;
  min-height: 100vh;
  width: 100vw;
}

.main-content {
  flex: 1 1 auto;
  width: calc(100vw - 260px);
  margin-left: 260px;
  box-sizing: border-box;
  padding: 0 !important;
  margin-top: 0 !important;
  position: relative;
  top: 0;
}

.main-content.with-header {
  padding-top: 96px;
}

.main-content.no-sidebar {
  width: 100vw;
  margin-left: 0;
}

.main-content .app-header {
  position: fixed !important;
  top: 0;
  left: 260px;
  right: 0;
  width: auto;
}

.main-content.no-sidebar .app-header {
  left: 0;
}
</style>
