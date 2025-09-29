<template>
  <div ref="mapEl" class="leaflet-map"></div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const props = defineProps({
  center: { type: Array, default: () => [ -23.5505, -46.6333 ] }, // São Paulo
  zoom: { type: Number, default: 12 },
  markers: { type: Array, default: () => [] }, // [{ lat, lng, label }]
})

const mapEl = ref(null)
let map

onMounted(() => {
  if (!mapEl.value) return

  map = L.map(mapEl.value).setView(props.center, props.zoom)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
  }).addTo(map)

  addMarkers()
})

function addMarkers() {
  if (!map) return
  props.markers.forEach(m => {
    L.marker([m.lat, m.lng]).addTo(map).bindPopup(m.label || '')
  })
}

watch(() => props.center, (c) => {
  if (map && Array.isArray(c) && c.length === 2) {
    map.setView(c, props.zoom)
  }
})
</script>

<style scoped>
.leaflet-map {
  width: 100%;
  height: 100%;
}
</style>

