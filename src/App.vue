<template>
  <div id="app">
    <!-- Sidebar (oculta na tela de login) -->
    <TheSidebar v-if="mostrarSidebar" />

    <main class="main-content" :class="{ 'no-sidebar': !mostrarSidebar, 'with-header': mostrarHeader }">
      <!-- Header oculto em login e gestão de demandas -->
      <TheHeader v-if="mostrarHeader" :titulo="tituloPagina" :fotoUsuario="fotoUsuario" />

      <!-- Conteúdo das rotas -->
      <RouterView />
    </main>
  </div>
 </template>

<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import TheSidebar from "./components/TheSidebar.vue";
import TheHeader from "./components/TheHeader.vue";

const route = useRoute();
const fotoUsuario = ref("");

// Sidebar não aparece no login
const mostrarSidebar = computed(() => route.path !== "/login");

// Header não aparece apenas no login
const mostrarHeader = computed(() => route.path !== "/login");

// Título automático por rota
const tituloPagina = computed(() => {
  const map = {
    "/login": "Login",
    "/inicio": "Início",
    "/dashboard": "Dashboard",
    "/gestao-demandas": "Gestão de Demandas",
    "/acoes": "Ações",
    "/cadastrar-acao": "Cadastrar Ação",
    "/tarefas": "Tarefas",
    "/cadastrar-tarefa": "Cadastrar Tarefa",
    "/financeiro": "Financeiro",
    "/eleicoes": "Eleições",
    "/configuracoes": "Configurações",
  };
  return map[route.path] || "CRM Político";
});
</script>

<style>
#app {
  display: flex;
  min-height: 100vh;
  width: 100vw; /* garante largura total da viewport */
}

.main-content {
  flex: 1 1 auto;
  width: calc(100vw - 260px); /* ocupa toda a largura restante */
  margin-left: 260px; /* espaço da sidebar fixa */
  box-sizing: border-box;
  padding: 0 !important; /* garante sem espaçamento superior */
  margin-top: 0 !important; /* colado no topo */
  position: relative;
  top: 0;
}

.main-content.with-header {
  /* Empurra o conteúdo para baixo quando o header está fixo */
  padding-top: 96px;
}

.main-content.no-sidebar {
  width: 100vw;
  margin-left: 0;
}

/* Faz o header ocupar toda a largura útil e ficar fixo */
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
