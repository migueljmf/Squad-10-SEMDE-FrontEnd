<template>
  <div ref="mapEl" class="leaflet-map"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const MODE_POINTS = 'points'
const MODE_HEAT = 'heat'
const MODE_GROUPED = 'clusters'

const props = defineProps({
  center: { type: Array, default: () => [-10.947247, -37.073082] },
  zoom: { type: Number, default: 12 },
  markers: { type: Array, default: () => [] },
  mode: { type: String, default: MODE_POINTS },
})

const mapEl = ref(null)
let map
let markerLayer
let heatLayer
let clusterLayer

onMounted(() => {
  if (!mapEl.value) return

  map = L.map(mapEl.value, { preferCanvas: true }).setView(props.center, props.zoom)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
  }).addTo(map)

  markerLayer = L.layerGroup()
  heatLayer = L.layerGroup()
  clusterLayer = L.layerGroup()

  renderLayers()
})

onBeforeUnmount(() => {
  if (map) {
    map.remove()
    map = null
  }
})

watch(() => props.center, (center) => {
  if (map && Array.isArray(center) && center.length === 2) {
    map.setView(center, props.zoom)
  }
})

watch(() => props.markers, renderLayers, { deep: true })
watch(() => props.mode, renderLayers)

function renderLayers() {
  if (!map) return

  const markers = getValidMarkers(props.markers)

  detachLayers()

  if (props.mode === MODE_HEAT) {
    renderHeat(markers)
    heatLayer.addTo(map)
    return
  }

  if (props.mode === MODE_GROUPED) {
    renderClusters(markers)
    clusterLayer.addTo(map)
    return
  }

  renderPoints(markers)
  markerLayer.addTo(map)
}

function detachLayers() {
  [markerLayer, heatLayer, clusterLayer].forEach((layer) => {
    if (!layer) return
    layer.clearLayers()
    if (map.hasLayer(layer)) {
      map.removeLayer(layer)
    }
  })
}

function getValidMarkers(source) {
  if (!Array.isArray(source)) return []
  return source.filter((item) => Number.isFinite(item?.lat) && Number.isFinite(item?.lng))
}

function renderPoints(markers) {
  markers.forEach((item) => {
    const marker = L.marker([item.lat, item.lng])
    if (item.label) marker.bindPopup(item.label)
    markerLayer.addLayer(marker)
  })
}

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

function renderHeat(markers) {
  const groups = aggregateMarkers(markers, 2)
  if (groups.length === 0) return

  const maxCount = Math.max(...groups.map((group) => group.count))

  groups.forEach((group) => {
    const intensity = group.count / maxCount
    const circle = L.circleMarker([group.lat, group.lng], {
      radius: 8 + intensity * 18,
      fillColor: getHeatColor(intensity),
      fillOpacity: 0.45 + intensity * 0.4,
      opacity: 0,
    })
    heatLayer.addLayer(circle)
  })
}

function getHeatColor(value) {
  const v = Math.min(1, Math.max(0, value))
  if (v <= 0.5) {
    return interpolateColor([59, 130, 246], [249, 115, 22], v / 0.5)
  }
  return interpolateColor([249, 115, 22], [220, 38, 38], (v - 0.5) / 0.5)
}

function interpolateColor(start, end, ratio) {
  const clamped = Math.min(1, Math.max(0, ratio))
  const channels = start.map((channel, index) => {
    return Math.round(channel + (end[index] - channel) * clamped)
  })
  return `rgb(${channels.join(',')})`
}

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
