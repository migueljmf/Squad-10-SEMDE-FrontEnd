<template>
  <div class="acoes">
    <div class="acoes-content">
      <div class="map-wrapper">
        <LeafletMap class="map" :center="[-23.5505, -46.6333]" :zoom="12" />
      </div>

      <button @click="$router.push('/cadastrar-acao')" class="nova-acao">
        + Nova Ação
      </button>
    </div>
  </div>
 </template>

<script setup>
import LeafletMap from '@/components/LeafletMap.vue'
</script>

<style scoped>
.acoes {
  min-height: calc(100vh - 96px); /* abaixo do header */
  display: flex;
  align-items: center; /* centralização vertical */
  justify-content: center; /* centralização horizontal */
}

.acoes-content {
  width: 100%;
  max-width: 1120px;
  padding: 0 24px;
}

.map-wrapper {
  width: 100%;
  height: 420px;
  border-radius: 12px;
  overflow: hidden; /* arredonda o mapa */
  box-shadow: 0 6px 14px rgba(0,0,0,0.08);
  margin-bottom: 20px;
}

.map {
  width: 100%;
  height: 100%;
}

.nova-acao {
  background: #1565c0;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
}
</style>
