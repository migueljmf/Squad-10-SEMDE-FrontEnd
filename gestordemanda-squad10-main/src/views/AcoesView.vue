<template>
  <div class="acoes">
    <div class="acoes-content">
      <div class="toolbar">
        <button @click="$router.push('/cadastrar-acao')" class="nova-acao">
          + Nova Ação
        </button>
      </div>

      <div class="map-wrapper">
        <LeafletMap class="map" :center="[-23.5505, -46.6333]" :zoom="12" />
      </div>
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

.toolbar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;
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
  color: #fff;
  border: none;
  height: 44px;
  min-width: 160px;
  padding: 0 20px;
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  box-shadow: 0 6px 14px rgba(0,0,0,0.18);
}

@media (max-width: 640px) {
  .toolbar { justify-content: stretch; }
  .nova-acao { width: 100%; min-width: 0; }
}
</style>
