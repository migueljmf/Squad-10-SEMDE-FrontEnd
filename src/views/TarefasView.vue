<template>
  <div class="tarefas">
    <div class="tarefas-content">
<<<<<<< HEAD
      <header class="top-bar">
        <div class="top-text">
          <p class="section-label">Tarefas</p>
          <h1 class="section-title">Mapa de Tarefas</h1>
        </div>
        <button @click="$router.push('/cadastrar-tarefa')" class="nova-tarefa">
          <span class="nova-tarefa-icone">+</span>
          <span>Nova Tarefa</span>
        </button>
      </header>

      <div class="map-wrapper">
        <LeafletMap
          class="map"
          :center="mapCenter"
          :zoom="mapZoom"
          :markers="mapMarkers"
          :mode="modoVisualizacao"
        />
      </div>

      <div class="map-buttons">
        <button
          v-for="opcao in modos"
          :key="opcao.value"
          type="button"
          class="map-mode-btn"
          :class="{ active: opcao.value === modoVisualizacao }"
          @click="modoVisualizacao = opcao.value"
        >
          {{ opcao.label }}
        </button>
=======
      <div class="toolbar">
        <button @click="$router.push('/cadastrar-tarefa')" class="nova-tarefa">
          + Nova Tarefa
        </button>
      </div>

      <div class="map-wrapper">
        <LeafletMap class="map" :center="[-23.5505, -46.6333]" :zoom="12" />
>>>>>>> 43ddee921fdf20cbd3fb65151433476bd77d9f71
      </div>
    </div>
  </div>
</template>

<script setup>
<<<<<<< HEAD
import { computed, ref } from 'vue'
import LeafletMap from '@/components/LeafletMap.vue'
import { useDemandasStore } from '@/stores/useDemandasStore'

const DEFAULT_CENTER = [-23.5505, -46.6333]
const DEFAULT_ZOOM = 12

const store = useDemandasStore()
const modoVisualizacao = ref('points')
const modos = [
  { value: 'points', label: 'PONTOS INDIVIDUAIS' },
  { value: 'clusters', label: 'CONTADORES POR BAIRRO' },
  { value: 'heat', label: 'MAPA DE CALOR' },
]

const tarefas = computed(() =>
  store.demandas.value.filter((item) => item.tipoSlug === 'tarefa')
)

const mapMarkers = computed(() =>
  tarefas.value
    .map((tarefa) => ({
      lat: toNumber(tarefa.latitude),
      lng: toNumber(tarefa.longitude),
      label: buildLabel(tarefa),
    }))
    .filter((item) => Number.isFinite(item.lat) && Number.isFinite(item.lng))
)

const mapCenter = computed(() => {
  if (mapMarkers.value.length === 0) return DEFAULT_CENTER

  const { latTotal, lngTotal } = mapMarkers.value.reduce(
    (acc, marker) => ({
      latTotal: acc.latTotal + marker.lat,
      lngTotal: acc.lngTotal + marker.lng,
    }),
    { latTotal: 0, lngTotal: 0 }
  )

  return [latTotal / mapMarkers.value.length, lngTotal / mapMarkers.value.length]
})

const mapZoom = computed(() => {
  if (mapMarkers.value.length === 1) return 14
  return DEFAULT_ZOOM
})

function toNumber(value) {
  if (value == null) return null
  const parsed = typeof value === 'string' ? Number.parseFloat(value) : value
  return Number.isFinite(parsed) ? parsed : null
}

function buildLabel(tarefa) {
  const linhas = []
  if (tarefa.titulo) linhas.push(`<strong>${tarefa.titulo}</strong>`)
  if (tarefa.local && tarefa.local !== 'Nao informado') linhas.push(tarefa.local)
  if (tarefa.data) linhas.push(`Data: ${tarefa.data}`)
  if (tarefa.status) linhas.push(`Status: ${tarefa.status}`)
  return linhas.join('<br />')
}
=======
import LeafletMap from '@/components/LeafletMap.vue'
>>>>>>> 43ddee921fdf20cbd3fb65151433476bd77d9f71
</script>

<style scoped>
.tarefas {
<<<<<<< HEAD
  min-height: calc(100vh - 96px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 16px;
  background: #ffffff;
=======
  min-height: calc(100vh - 96px); /* abaixo do header */
  display: flex;
  align-items: center; /* centraliza verticalmente */
  justify-content: center; /* centraliza horizontalmente */
>>>>>>> 43ddee921fdf20cbd3fb65151433476bd77d9f71
}

.tarefas-content {
  width: 100%;
<<<<<<< HEAD
  max-width: 1140px;
  background: #ffffff;
  border-radius: 24px;
  padding: 40px 48px 48px;
  box-shadow: 0 18px 50px rgba(15, 35, 95, 0.12);
  border: 1px solid rgba(20, 56, 126, 0.08);
  color: #1b2a4b;
}

.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 24px;
}

.top-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.section-label {
  margin: 0;
  font-size: 14px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #3b6fd1;
}

.section-title {
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  color: #0f1f3d;
}

.nova-tarefa {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, #1dd18a, #14b570);
  color: #ffffff;
  border: none;
  padding: 14px 28px;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.02em;
  cursor: pointer;
  box-shadow: 0 16px 28px rgba(20, 181, 112, 0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.nova-tarefa:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 34px rgba(20, 181, 112, 0.42);
}

.nova-tarefa-icone {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  font-size: 18px;
  font-weight: 700;
=======
  max-width: 1120px;
  padding: 0 24px;
}

.toolbar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;
>>>>>>> 43ddee921fdf20cbd3fb65151433476bd77d9f71
}

.map-wrapper {
  width: 100%;
<<<<<<< HEAD
  height: 440px;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 20px 46px rgba(11, 33, 78, 0.18);
  border: 1px solid rgba(19, 61, 137, 0.12);
  background: #f6f8ff;
=======
  height: 420px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 14px rgba(0,0,0,0.08);
>>>>>>> 43ddee921fdf20cbd3fb65151433476bd77d9f71
}

.map {
  width: 100%;
  height: 100%;
}
<<<<<<< HEAD

.map-buttons {
  margin-top: 28px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}

.map-mode-btn {
  border: 1px solid #1e3fa1;
  color: #1e3fa1;
  background: #ffffff;
  padding: 12px 26px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.map-mode-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 20px rgba(30, 63, 161, 0.25);
}

.map-mode-btn.active {
  background: linear-gradient(135deg, #2b62ff, #1a46d4);
  color: #ffffff;
  border-color: transparent;
  box-shadow: 0 16px 34px rgba(36, 84, 255, 0.4);
}

@media (max-width: 1024px) {
  .tarefas {
    padding: 32px 16px;
  }

  .tarefas-content {
    padding: 32px 28px 36px;
  }

  .section-title {
    font-size: 28px;
  }

  .map-wrapper {
    height: 400px;
  }
}

@media (max-width: 640px) {
  .tarefas {
    padding: 24px 12px 36px;
  }

  .tarefas-content {
    padding: 28px 20px 32px;
    border-radius: 18px;
  }

  .top-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .nova-tarefa {
    justify-content: center;
    width: 100%;
  }

  .map-wrapper {
    height: 360px;
  }

  .map-mode-btn {
    flex: 1 1 100%;
    text-align: center;
  }
=======
.nova-tarefa {
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
  .nova-tarefa { width: 100%; min-width: 0; }
>>>>>>> 43ddee921fdf20cbd3fb65151433476bd77d9f71
}
</style>
