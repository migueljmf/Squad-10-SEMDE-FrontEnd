<template>
  <div class="acoes">
    <div class="acoes-content">
      <header class="top-bar">
        <div class="top-text">
          <p class="section-label">Ações</p>
          <h1 class="section-title">Mapa de Ações</h1>
        </div>
        <button @click="$router.push('/cadastrar-acao')" class="nova-acao">
          <span class="nova-acao-icone">+</span>
          <span>Nova Ação</span>
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
      </div>
    </div>
  </div>
</template>

<script setup>
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

const acoes = computed(() =>
  store.demandas.value.filter((item) => item.tipoSlug === 'acao')
)

const mapMarkers = computed(() =>
  acoes.value
    .map((acao) => ({
      lat: toNumber(acao.latitude),
      lng: toNumber(acao.longitude),
      label: buildLabel(acao),
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

function buildLabel(acao) {
  const linhas = []
  if (acao.titulo) linhas.push(`<strong>${acao.titulo}</strong>`)
  if (acao.local && acao.local !== 'Nao informado') linhas.push(acao.local)
  if (acao.data) linhas.push(`Data: ${acao.data}`)
  if (acao.status) linhas.push(`Status: ${acao.status}`)
  return linhas.join('<br />')
}
</script>

<style scoped>
.acoes {
  min-height: calc(100vh - 96px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 16px;
  background: #ffffff;
}

.acoes-content {
  width: 100%;
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

.nova-acao {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, #18d26e, #10b56a);
  color: #ffffff;
  border: none;
  padding: 14px 28px;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.02em;
  cursor: pointer;
  box-shadow: 0 16px 30px rgba(16, 181, 106, 0.35);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.nova-acao:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 34px rgba(16, 181, 106, 0.45);
}

.nova-acao-icone {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  font-size: 18px;
  font-weight: 700;
}

.map-wrapper {
  width: 100%;
  height: 440px;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 20px 46px rgba(11, 33, 78, 0.18);
  border: 1px solid rgba(19, 61, 137, 0.12);
  background: #f6f8ff;
}

.map {
  width: 100%;
  height: 100%;
}

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
  background: linear-gradient(135deg, #2a6bff, #1542da);
  color: #ffffff;
  border-color: transparent;
  box-shadow: 0 16px 34px rgba(36, 84, 255, 0.4);
}

@media (max-width: 1024px) {
  .acoes {
    padding: 32px 16px;
  }

  .acoes-content {
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
  .acoes {
    padding: 24px 12px 36px;
  }

  .acoes-content {
    padding: 28px 20px 32px;
    border-radius: 18px;
  }

  .top-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .nova-acao {
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
}
</style>
