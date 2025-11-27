<template>
  <div class="gestao-demandas">
    <PageHero
      title="Gestao de Demandas"
      description="Organize o fluxo de demandas, filtre por status e priorize o que requer acao imediata."
      highlight-label="Demandas monitoradas"
      :highlight-value="totalDemandasFormatado"
      :highlight-subtext="totalDemandasSubtexto"
    />

    <StatusCards
      :counts="contagemStatus"
      :filtro="filtroStatusAtivo"
      @toggle="toggleFiltroStatus"
      @drop="onDrop"
    />

    <div v-if="store.isLoading.value" class="loading-state">
      <p>Carregando demandas...</p>
    </div>

    <div v-else-if="store.error.value" class="error-state">
      <p>Erro ao carregar demandas: {{ store.error.value }}</p>
      <button type="button" class="btn-retry" @click="recarregar">Tentar novamente</button>
    </div>

    <section v-else class="demandas-list">
      <p v-if="demandasFormatadas.length === 0" class="empty-state">
        Nenhuma demanda encontrada. Ajuste os filtros ou cadastre uma nova tarefa/acao.
      </p>
      <template v-else>
        <DemandaCard
          v-for="demanda in demandasFormatadas"
          :key="demanda.id"
          :demanda="demanda"
          :iconPencil="iconPencil"
          :iconTrash="iconTrash"
          :iconMarker="iconMarker"
          @dragstart="onDragStart"
          @dragend="onDragEnd"
          @abrir="abrirDetalhe"
          @editar="editarDemanda"
          @remover="removerDemanda"
          @atualizar="atualizarStatus"
        />
      </template>
    </section>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import PageHero from "@/components/PageHero.vue";
import StatusCards from "@/components/GestaoDemandas/StatusCards.vue";
import DemandaCard from "@/components/GestaoDemandas/DemandaCard.vue";
import iconPencil from "@/assets/fi-ss-pencil.svg?url";
import iconTrash from "@/assets/fi-ss-trash.svg?url";
import iconMarker from "@/assets/fi-ss-marker.svg?url";
import { useDemandasStore } from "../stores/useDemandasStore";

const router = useRouter();
const store = useDemandasStore();

const filtroStatusAtivo = ref(null);

// favoritos removed

const contagemStatus = computed(() => store.countsPorStatus.value);
const totalDemandas = computed(() => store.demandas.value.length);
const totalDemandasFormatado = computed(() =>
  totalDemandas.value.toLocaleString("pt-BR")
);
const totalDemandasSubtexto = computed(() => {
  if (totalDemandas.value === 0) return "Nenhuma demanda cadastrada";
  const pendentes = contagemStatus.value?.pendente || 0;
  if (pendentes === 0) return "Todas acompanhadas sem pendencias";
  return `${pendentes} pendente${pendentes === 1 ? "" : "s"} no momento`;
});

const demandasFiltradas = computed(() => {
  let resultado = store.demandas.value;
  
  // Filtro por status
  if (filtroStatusAtivo.value) {
    resultado = resultado.filter((item) => {
      const statusSlug = item.statusSlug || "pendente";
      return statusSlug === filtroStatusAtivo.value;
    });
  }
  return resultado;
});

const demandasFormatadas = computed(() =>
  demandasFiltradas.value.map((item) => {
    const resumoBase = item.descricaoResumida && item.descricaoResumida.length > 0 ? item.descricaoResumida : item.descricao || "";
    const precisaReticencias = (item.descricao || "").length > resumoBase.length;
    return {
      ...item,
      tipoClass: item.tipoSlug || "tarefa",
      statusClass: item.statusSlug || "pendente",
      descricaoResumo: resumoBase ? `${resumoBase}${precisaReticencias ? "..." : ""}` : "Sem descricao",
      dataFormatada: formatarData(item.data),
      categoria: item.categoria || item.tipo,
    };
  })
);

// irParaFavoritos removed

function obterNomeRotaDetalhe(item) {
  const base = (item?.tipoSlug || item?.tipo || "").toString().toLowerCase();
  return base.includes("acao") ? "DetalheAcao" : "DetalheTarefa";
}

function abrirDetalhe(id) {
  const registro = store.getById(id);
  if (!registro) return;
  router.push({ name: obterNomeRotaDetalhe(registro), params: { id } });
}
function editarDemanda(id) {
  router.push({ name: "EditarTarefa", params: { id } });
}

async function removerDemanda(id) {
  const demanda = store.getById(id);
  const titulo = demanda?.titulo || "esta demanda";
  if (window.confirm(`Deseja realmente excluir ${titulo}?`)) {
    try {
      await store.removeDemanda(id);
    } catch (err) {
      window.alert("Erro ao excluir demanda. Tente novamente.");
    }
  }
}


function formatarData(valor) {
  if (!valor) return "Data nao informada";
  const data = new Date(`${valor}T00:00:00`);
  if (Number.isNaN(data.getTime())) {
    const alternativa = new Date(valor);
    return Number.isNaN(alternativa.getTime()) ? valor : alternativa.toLocaleDateString("pt-BR");
  }
  return data.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

const draggedDemanda = ref(null);
const dragOverZone = ref(null);

onMounted(async () => {
  await store.fetchDemandas();
});

function onDragStart(event, demanda) {
  draggedDemanda.value = demanda;
  event.dataTransfer.effectAllowed = "move";
  event.target.style.opacity = "0.5";
}

function onDragEnd(event) {
  event.target.style.opacity = "1";
  draggedDemanda.value = null;
  dragOverZone.value = null;
}

async function onDrop(event, newStatus) {
  event.preventDefault();
  dragOverZone.value = null;

  if (!draggedDemanda.value) return;

  const demandaId = draggedDemanda.value.id;
  await atualizarStatus(demandaId, newStatus, draggedDemanda.value.tipo);
  draggedDemanda.value = null;
}

async function atualizarStatus(id, novoStatus, tipo) {
  try {
    if (tipo === "Tarefa"){
    await store.updateStatus(id, novoStatus, tipo);}
  } catch (err) {
    window.alert("Erro ao atualizar status. Tente novamente.");
  }
}

function toggleFiltroStatus(status) {
  if (filtroStatusAtivo.value === status) {
    filtroStatusAtivo.value = null; // Remove o filtro se clicar no mesmo
  } else {
    filtroStatusAtivo.value = status; // Ativa o filtro
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap");

.gestao-demandas {
  padding: 48px 32px 56px;
  font-family: "Poppins", sans-serif;
  color: #0f172a;
  background: linear-gradient(180deg, #f8fbff 0%, #ffffff 100%);
  display: flex;
  flex-direction: column;
  gap: 32px;
  min-height: 100vh;
  box-sizing: border-box;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.status-cards {
  display: flex;
  gap: 20px;
  margin: 0 auto 48px;
  max-width: 1300px;
  width: 100%;
}

.card {
  width: 306px;
  height: 184px;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 24px 32px;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 3px solid transparent;
}

.drop-zone-card {
  border: 3px solid transparent;
}

.drop-zone-card.drag-over {
  transform: scale(1.05);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
  border-style: dashed;
}

.drop-zone-card.pendente.drag-over {
  border-color: #fba441;
  background: #fff4e0;
}

.drop-zone-card.andamento.drag-over {
  border-color: #1e88e5;
  background: #e3f2fd;
}

.drop-zone-card.concluido.drag-over {
  border-color: #43a047;
  background: #e8f5e9;
}

.drop-hint {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  font-weight: 600;
  color: #374957;
  text-align: center;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  pointer-events: none;
  z-index: 10;
}

.card .count-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  min-width: 44px;
  min-height: 44px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-weight: 600;
  font-size: 18px;
}

.card .card-title {
  font-size: 22px;
  font-weight: 600;
  margin: 0;
}

.card.pendente {
  background: #fddc9c;
}

.card.pendente .count-badge {
  background: #fba441;
  color: #374957;
}

.card.andamento {
  background: #c5e1fa;
}

.card.andamento .count-badge {
  background: #1e88e5;
  color: #fff;
}

.card.concluido {
  background: #c8e6c9;
}

.card.concluido .count-badge {
  background: #43a047;
  color: #fff;
}

.demandas-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1300px;
  margin: 0 auto;
  width: 100%;
}

.empty-state {
  margin: 0;
  padding: 64px 24px;
  text-align: center;
  border-radius: 20px;
  background: #f5f7fb;
  color: #4a4f5a;
  font-weight: 500;
}

.demanda-card {
  position: relative;
  width: 100%;
  max-width: 1300px;
  min-height: 191px;
  border-radius: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  padding: 24px 0px 24px 0px;
  overflow: visible;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.demanda-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(21, 101, 192, 0.16);
}

.badges-container {
  position: absolute;
  top: 22px;
  right: 24px;
  display: flex;
  gap: 12px;
  align-items: center;
  z-index: 10;
}

.badge {
  min-width: 135px;
  height: 37px;
  padding: 0 16px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  font-size: 18px;
  line-height: 24px;
  font-weight: 500;
}

.badge-type {
  background-color: #a8ffb8;
  color: #000;
}

.badge-type.type-acao {
  background: #ce93d8;
}

.badge-status-wrapper {
  position: relative;
}

.badge-status-select {
  min-width: 135px;
  height: 37px;
  padding: 0 32px 0 16px;
  border: none;
  border-radius: 50px;
  font-family: "Poppins", sans-serif;
  font-size: 18px;
  line-height: 24px;
  font-weight: 500;
  cursor: pointer;
  appearance: none;
}

.badge-status-select:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.badge-status-select:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
}

.badge-status-select.status-pendente {
  background-color: #fddc9c;
  color: #fba441;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='currentColor' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  transition: all 0.2s ease;
}

.badge-status-select.status-em-andamento,
.badge-status-select.status-andamento {
  background: #90caf9;
  color: #1565c0;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='currentColor' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  transition: all 0.2s ease;
}

.badge-status-select.status-concluida,
.badge-status-select.status-concluido {
  background: #c8e6c9;
  color: #2e7d32;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='currentColor' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  transition: all 0.2s ease;
}

.badge-status-select.status-cancelada {
  background: #ffcdd2;
  color: #c62828;
}

.demanda-title {
  position: absolute;
  top: 80px;
  left: 40px;
  font-size: 24px;
  font-weight: 600;
  color: #000;
  margin: 0;
  max-width: calc(100% - 80px);
}

.demanda-description {
  position: absolute;
  top: 115px;
  left: 40px;
  font-size: 16px;
  color: #555;
  margin: 0;
  max-width: calc(100% - 80px);
  max-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.demanda-meta {
  position: absolute;
  bottom: 24px;
  left: 40px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #666;
}

.meta-icon {
  width: 16px;
  height: 16px;
}

.meta-separator {
  color: #ccc;
}

.card-actions {
  position: absolute;
  bottom: 24px;
  right: 24px;
  display: flex;
  gap: 12px;
  align-items: center;
}

.action-button {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: #fff;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.action-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.action-button.favorito.ativo {
  background: #ffe0e0;
}

.action-icon {
  width: 20px;
  height: 20px;
}

.loading-state,
.error-state {
  margin: 64px auto;
  padding: 48px 24px;
  text-align: center;
  border-radius: 20px;
  background: #f5f7fb;
  max-width: 600px;
}

.loading-state p {
  margin: 0;
  font-size: 18px;
  color: #4a4f5a;
  font-weight: 500;
}

.error-state p {
  margin: 0 0 24px;
  font-size: 18px;
  color: #d32f2f;
  font-weight: 500;
}

.btn-retry {
  padding: 12px 32px;
  border: none;
  border-radius: 12px;
  background: #1565c0;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.btn-retry:hover {
  background: #0d47a1;
  transform: translateY(-2px);
}

.demanda-card[draggable="true"] {
  cursor: move;
}

.demanda-card[draggable="true"]:active {
  cursor: grabbing;
}

.card.filtro-ativo {
  border-color: #374957;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  transform: scale(1.02);
}

.card.filtro-ativo::after {
  content: "✓ Filtro ativo";
  position: absolute;
  bottom: 16px;
  right: 16px;
  font-size: 12px;
  font-weight: 600;
  color: #374957;
  background: rgba(255, 255, 255, 0.9);
  padding: 4px 8px;
  border-radius: 6px;
}

@media (max-width: 1100px) {
  .badges-container {
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
  }
}

@media (max-width: 768px) {
  .gestao-demandas {
    padding: 32px 20px 40px;
  }

  .gestao-hero-button {
    width: 100%;
    justify-content: center;
  }

  .status-cards {
    flex-direction: column;
    align-items: center;
  }

  .card {
    width: 100%;
    max-width: 400px;
  }

  .demanda-card {
    min-height: auto;
    padding: 80px 24px 80px 24px;
  }

  .badges-container {
    position: static;
    flex-direction: row;
    justify-content: flex-start;
    margin-bottom: 16px;
  }

  .demanda-title {
    position: static;
    margin-bottom: 12px;
  }

  .demanda-description {
    position: static;
    margin-bottom: 16px;
    max-height: none;
  }

  .demanda-meta {
    position: static;
    margin-bottom: 16px;
  }

  .card-actions {
    position: static;
    justify-content: flex-end;
  }

  .demanda-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .action-button {
    width: 36px;
    height: 36px;
  }
}
</style>
