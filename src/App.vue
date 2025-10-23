<template>
  <div id="app">
    <TheSidebar v-if="mostrarSidebar" />

    <main class="main-content" :class="{ 'no-sidebar': !mostrarSidebar }">

      <!-- Conteudo das rotas -->
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import TheSidebar from "./components/TheSidebar.vue";

const route = useRoute();

const mostrarSidebar = computed(() => route.path !== "/login");
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

.main-content.no-sidebar {
  width: 100vw;
  margin-left: 0;
}
</style>
