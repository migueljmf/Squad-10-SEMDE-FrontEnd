<template>
  <div class="tarefas">
    <PageHero
      title="Mapa de Tarefas"
      description="Visualize onde estao as atividades em andamento e escolha como prefere analisar o territorio."
      highlight-label="Tarefas registradas"
      :highlight-value="totalTarefasFormatado"
      :highlight-subtext="tarefasHighlightSubtexto"
    >
      <template #extra>
        <button @click="$router.push('/cadastrar-tarefa')" class="nova-tarefa">
          <span class="nova-tarefa-icone">+</span>
          <span>Nova Tarefa</span>
        </button>
      </template>
    </PageHero>

    <div class="tarefas-content">
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
import { computed, ref, onMounted } from "vue";
import PageHero from "@/components/PageHero.vue";
import LeafletMap from "@/components/LeafletMap.vue";
import { useDemandasStore } from "@/stores/useDemandasStore";
import { demandasApi } from "@/services/demandasApi";

const DEFAULT_CENTER = [-23.5505, -46.6333];
const DEFAULT_ZOOM = 12;

const store = useDemandasStore();
const modoVisualizacao = ref("points");
const modos = [
  { value: "points", label: "PONTOS INDIVIDUAIS" },
  { value: "clusters", label: "CONTADORES POR BAIRRO" },
  { value: "heat", label: "MAPA DE CALOR" },
];

const tarefas = computed(() =>
  store.demandas.value.filter((item) => item.tipoSlug === "tarefa")
);

const totalTarefas = computed(() => tarefas.value.length);
const totalTarefasFormatado = computed(() =>
  totalTarefas.value.toLocaleString("pt-BR")
);

const externalMarkers = ref([]);

const mapMarkers = computed(() => {
  // prefer coordinates from the new endpoint when available
  if (externalMarkers.value && externalMarkers.value.length) {
    return externalMarkers.value
      .map((t) => ({
        lat: toNumber(t.contact?.address?.latitude),
        lng: toNumber(t.contact?.address?.longitude),
        label: `<strong>${t.title || "Sem titulo"}</strong>`,
      }))
      .filter((m) => Number.isFinite(m.lat) && Number.isFinite(m.lng))
  }

  return tarefas.value
    .map((tarefa) => ({
      lat: toNumber(tarefa.latitude),
      lng: toNumber(tarefa.longitude),
      label: buildLabel(tarefa),
    }))
    .filter((item) => Number.isFinite(item.lat) && Number.isFinite(item.lng))
});

const tarefasComLocalizacao = computed(() => mapMarkers.value.length);
const tarefasComLocalizacaoFormatado = computed(() =>
  tarefasComLocalizacao.value.toLocaleString("pt-BR")
);
const tarefasHighlightSubtexto = computed(() => {
  if (tarefasComLocalizacao.value === 0) {
    return "Defina coordenadas para exibir as tarefas no mapa.";
  }
  return `${tarefasComLocalizacaoFormatado.value} com localizacao georreferenciada`;
});

onMounted(async () => {
  try {
    externalMarkers.value = await demandasApi.getTaskCoordinates()
  } catch (err) {
    console.warn('Nao foi possivel carregar coordenadas externas:', err)
    externalMarkers.value = []
  }
})

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
</script>

<style scoped>
.tarefas {
  min-height: 100vh;
  padding: 48px 32px 56px;
  background: linear-gradient(180deg, #f8fbff 0%, #f1f5f9 45%, #ffffff 100%);
  display: flex;
  flex-direction: column;
  gap: 32px;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.tarefas-content {
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 24px;
  padding: 40px 48px 48px;
  box-shadow: 0 18px 50px rgba(15, 35, 95, 0.12);
  border: 1px solid rgba(20, 56, 126, 0.08);
  color: #1b2a4b;
  display: flex;
  flex-direction: column;
  gap: 28px;
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
  background: linear-gradient(135deg, #2b62ff, #1a46d4);
  color: #ffffff;
  border-color: transparent;
  box-shadow: 0 16px 34px rgba(36, 84, 255, 0.4);
}

@media (max-width: 1024px) {
  .tarefas {
    padding: 32px 24px 40px;
  }

  .tarefas-content {
    padding: 32px 28px 36px;
  }

  .map-wrapper {
    height: 400px;
  }
}

@media (max-width: 640px) {
  .tarefas {
    padding: 24px 16px 36px;
  }

  .tarefas-content {
    padding: 28px 20px 32px;
    border-radius: 18px;
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
}
</style>
