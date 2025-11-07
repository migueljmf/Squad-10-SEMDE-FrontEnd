<template>
  <div ref="mapEl" class="leaflet-map"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import L from 'leaflet'
import '/src/lib/leaflet-heat.js' // ✅ plugin baixado manualmente
import 'leaflet/dist/leaflet.css'

// --- Modos de visualização ---
const MODE_POINTS = 'points'
const MODE_HEAT = 'heat'
const MODE_GROUPED = 'clusters'

// --- Propriedades recebidas ---
const props = defineProps({
  center: { type: Array, default: () => [-10.947247, -37.073082] },
  zoom: { type: Number, default: 12 },
  markers: { type: Array, default: () => [] },
  mode: { type: String, default: MODE_POINTS },
})

const mapEl = ref(null)
let map
let markerLayer = null
let heatLayer = null
let clusterLayer = null

// --- Inicializa o mapa ---
onMounted(() => {
  if (!mapEl.value) return

  map = L.map(mapEl.value, { preferCanvas: true }).setView(props.center, props.zoom)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
  }).addTo(map)

  markerLayer = L.layerGroup()
  clusterLayer = L.layerGroup()

  renderLayers()
})

// --- Limpa ao desmontar ---
onBeforeUnmount(() => {
  if (map) {
    map.remove()
    map = null
  }
})

// --- Reações ---
watch(() => props.center, (center) => {
  if (map && Array.isArray(center) && center.length === 2) {
    map.setView(center, props.zoom)
  }
})
watch(() => props.markers, renderLayers, { deep: true })
watch(() => props.mode, renderLayers)

// --- Renderização dinâmica ---
function renderLayers() {
  if (!map) return

  const markers = getValidMarkers(props.markers)
  detachLayers()

  switch (props.mode) {
    case MODE_HEAT:
      renderHeat(markers)
      break
    case MODE_GROUPED:
      renderClusters(markers)
      break
    default:
      renderPoints(markers)
      break
  }
}

// --- Remove camadas anteriores ---
function detachLayers() {
  ;[markerLayer, heatLayer, clusterLayer].forEach((layer) => {
    if (!layer) return
    layer.clearLayers?.()
    if (map.hasLayer(layer)) map.removeLayer(layer)
  })
}

// --- Filtra marcadores válidos ---
function getValidMarkers(source) {
  if (!Array.isArray(source)) return []
  return source.filter((item) => Number.isFinite(item?.lat) && Number.isFinite(item?.lng))
}

// --- Renderiza marcadores individuais ---
function renderPoints(markers) {
  markers.forEach((item) => {
    const marker = L.marker([item.lat, item.lng])
    if (item.label) marker.bindPopup(item.label)
    markerLayer.addLayer(marker)
  })
  markerLayer.addTo(map)
}

// --- Agrupa marcadores por coordenada aproximada ---
function aggregateMarkers(markers, precision = 2) {
  const groups = new Map()
  markers.forEach((marker) => {
    const key = `${marker.lat.toFixed(precision)}|${marker.lng.toFixed(precision)}`
    const current = groups.get(key)

    if (current) {
      current.count += 1
      current.items.push(marker)
    } else {
      groups.set(key, {
        lat: marker.lat,
        lng: marker.lng,
        count: 1,
        items: [marker],
      })
    }
  })
  return Array.from(groups.values())
}

// --- Renderiza o Heatmap ---
function renderHeat(markers) {
  if (heatLayer && map.hasLayer(heatLayer)) map.removeLayer(heatLayer)

  const groups = aggregateMarkers(markers, 2)
  if (groups.length === 0) return

  const maxCount = Math.max(...groups.map((g) => g.count))
  const heatData = groups.map((g) => [g.lat, g.lng, g.count / maxCount])

  heatLayer = L.heatLayer(heatData, {
    radius: 25,   // tamanho do ponto
    blur: 30,     // suavização
    maxZoom: 10,  // até qual zoom aplica suavização
    gradient: {
          0.0: '#5360ED', // azul claro
          0.25:'#9CA6A0',
          0.5: '#E5ED53',
          0.75:'#E9A053',
          1.0: '#ED5353', // vermelho
    },
  }).addTo(map)
}

// --- Renderiza clusters manuais (bolhas com contagem) ---
function renderClusters(markers) {
  const groups = aggregateMarkers(markers, 2)

  groups.forEach((group) => {
    const icon = L.divIcon({
      className: 'map-cluster',
      html: `<span>${group.count}</span>`,
      iconSize: [44, 44],
    })

    const marker = L.marker([group.lat, group.lng], { icon })

    if (group.count === 1) {
      const label = group.items[0]?.label
      if (label) marker.bindPopup(label)
    } else {
      const content = group.items.map((item) => item.label).filter(Boolean).join('<br />')
      if (content) marker.bindPopup(content)
    }

    clusterLayer.addLayer(marker)
  })
  clusterLayer.addTo(map)
}
</script>

<style scoped>
.leaflet-map {
  width: 100%;
  height: 100%;
}

.map-cluster {
  background: rgba(37, 99, 235, 0.85);
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  box-shadow: 0 10px 22px rgba(15, 23, 42, 0.22);
}

.map-cluster span {
  display: block;
  padding: 10px 14px;
}
</style>