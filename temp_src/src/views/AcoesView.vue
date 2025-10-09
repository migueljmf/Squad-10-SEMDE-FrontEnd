<template>
  <div class="acoes">
    <div class="acoes-content">
      <div class="toolbar">
        <button @click="$router.push('/cadastrar-acao')" class="nova-acao">
          + Nova Acao
        </button>
      </div>

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
          class="btn primary"
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
}

.acoes-content {
  width: 100%;
  max-width: 1120px;
  padding: 0 24px 32px;
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
  overflow: hidden;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
}

.map {
  width: 100%;
  height: 100%;
}

.map-buttons {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.map-buttons .btn.primary {
  min-width: 180px;
  justify-content: center;
  background: rgba(37, 99, 235, 0.1);
  color: #1d4ed8;
  box-shadow: none;
}

.map-buttons .btn.primary.active {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: #fff;
  box-shadow: 0 12px 24px rgba(37, 99, 235, 0.18);
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
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.18);
}

@media (max-width: 640px) {
  .toolbar {
    justify-content: stretch;
  }

  .nova-acao {
    width: 100%;
    min-width: 0;
  }

  .map-buttons {
    justify-content: center;
  }

  .map-buttons .btn.primary {
    flex: 1 1 100%;
  }
}
</style>


