<template>
  <div class="gestao-demandas">
    <div class="header">
      <div class="title">
        <div class="title-icon">
          <img :src="iconTask" alt="Gestao de Demandas" class="title-image" />
        </div>
        <h2>Gestao de Demandas</h2>
      </div>

      <div class="top-actions">
        <button
          type="button"
          class="top-icon-button"
          :class="{ ativo: searchAtiva }"
          aria-label="Pesquisar demandas"
          @click="togglePesquisa"
        >
          <img :src="iconSearch" alt="Pesquisar" class="top-icon" />
        </button>
        <button
          type="button"
          class="top-icon-button"
          :class="{ ativo: estaNosFavoritos }"
          aria-label="Ver demandas favoritas"
          @click="irParaFavoritos"
        >
          <img :src="iconStar" alt="Favoritos" class="top-icon" />
        </button>
      </div>
    </div>

    <transition name="fade-slide">
      <div v-if="searchAtiva" class="search-bar">
        <img :src="iconSearch" alt="Buscar" class="search-icon" />
        <input
          ref="searchInput"
          v-model="termoBusca"
          type="search"
          placeholder="Buscar por titulo ou descricao"
          aria-label="Campo de busca"
        />
        <button
          v-if="termoBusca"
          type="button"
          class="search-clear"
          aria-label="Limpar busca"
          @click="limparBusca"
        >
          &times;
        </button>
      </div>
    </transition>

    <section class="status-cards">
      <div 
        class="card pendente drop-zone-card"
        :class="{ 
          'drag-over': dragOverZone === 'pendente',
          'filtro-ativo': filtroStatusAtivo === 'pendente'
        }"
        @click="toggleFiltroStatus('pendente')"
        @dragover.prevent="dragOverZone = 'pendente'"
        @dragleave="dragOverZone = null"
        @drop="onDrop($event, 'pendente')"
      >
        <span class="count-badge">{{ contagemStatus.pendente }}</span>
        <p class="card-title">Pendentes</p>
        <div v-if="dragOverZone === 'pendente'" class="drop-hint">
          Solte aqui para marcar como Pendente
        </div>
      </div>
      <div 
        class="card andamento drop-zone-card"
        :class="{ 
          'drag-over': dragOverZone === 'em-andamento',
          'filtro-ativo': filtroStatusAtivo === 'em-andamento'
        }"
        @click="toggleFiltroStatus('em-andamento')"
        @dragover.prevent="dragOverZone = 'em-andamento'"
        @dragleave="dragOverZone = null"
        @drop="onDrop($event, 'em-andamento')"
      >
        <span class="count-badge">{{ contagemStatus.andamento }}</span>
        <p class="card-title">Em andamento</p>
        <div v-if="dragOverZone === 'em-andamento'" class="drop-hint">
          Solte aqui para marcar como Em Andamento
        </div>
      </div>
      <div 
        class="card concluido drop-zone-card"
        :class="{ 
          'drag-over': dragOverZone === 'concluida',
          'filtro-ativo': filtroStatusAtivo === 'concluida'
        }"
        @click="toggleFiltroStatus('concluida')"
        @dragover.prevent="dragOverZone = 'concluida'"
        @dragleave="dragOverZone = null"
        @drop="onDrop($event, 'concluida')"
      >
        <span class="count-badge">{{ contagemStatus.concluido }}</span>
        <p class="card-title">Concluidas</p>
        <div v-if="dragOverZone === 'concluida'" class="drop-hint">
          Solte aqui para marcar como Concluída
        </div>
      </div>
    </section>

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
        <article
          v-for="demanda in demandasFormatadas"
          :key="demanda.id"
          class="demanda-card"
          :draggable="true"
          role="button"
          tabindex="0"
          @dragstart="onDragStart($event, demanda)"
          @dragend="onDragEnd"
          @click="abrirDetalhe(demanda.id)"
          @keyup.enter="abrirDetalhe(demanda.id)"
        >
          <div class="badges-container">
            <span class="badge badge-type" :class="['type-' + demanda.tipoClass]">
              {{ demanda.tipo }}
            </span>
            <div class="badge-status-wrapper" @click.stop>
              <select
                :id="'status-' + demanda.id"
                :value="demanda.statusClass"
                class="badge badge-status-select"
                :class="['status-' + demanda.statusClass]"
                @change="atualizarStatus(demanda.id, $event.target.value)"
              >
                <option value="pendente">Pendente</option>
                <option value="em-andamento">Em andamento</option>
                <option value="concluida">Concluída</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </div>
          </div>

          <h3 class="demanda-title">{{ demanda.titulo }}</h3>
          <p class="demanda-description">{{ demanda.descricaoResumo }}</p>

          <div class="demanda-meta">
            <img :src="iconMarker" alt="Local" class="meta-icon" />
            <span>{{ demanda.categoria }}</span>
            <span class="meta-separator">|</span>
            <span>{{ demanda.dataFormatada }}</span>
          </div>

          <div class="card-actions">
            <button
              type="button"
              class="action-button"
              aria-label="Editar"
              @click.stop="editarDemanda(demanda.id)"
            >
              <img :src="iconPencil" alt="Editar" class="action-icon" />
            </button>
            <button
              type="button"
              class="action-button"
              aria-label="Excluir"
              @click.stop="removerDemanda(demanda.id)"
            >
              <img :src="iconTrash" alt="Excluir" class="action-icon" />
            </button>
            <button
              type="button"
              class="action-button favorito"
              :class="{ ativo: demanda.isFavorito }"
              aria-label="Favoritar"
              @click.stop="toggleFavorito(demanda.id)"
            >
              <img :src="iconHeart" alt="Favoritar" class="action-icon" />
            </button>
          </div>
        </article>
      </template>
    </section>
  </div>
</template>

<script setup>
import { computed, ref, nextTick, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import iconTask from "@/assets/fi-ss-pencil.svg?url";
import iconSearch from "@/assets/Group.svg?url";
import iconStar from "@/assets/star.svg?url";
import iconPencil from "@/assets/fi-ss-pencil.svg?url";
import iconTrash from "@/assets/fi-ss-trash.svg?url";
import iconHeart from "@/assets/fi-ss-heart.svg?url";
import iconMarker from "@/assets/fi-ss-marker.svg?url";
import { useDemandasStore } from "../stores/useDemandasStore";

const router = useRouter();
const route = useRoute();
const store = useDemandasStore();

const searchAtiva = ref(false);
const termoBusca = ref("");
const searchInput = ref(null);
const filtroStatusAtivo = ref(null);

const estaNosFavoritos = computed(() => route.name === "FavoritosDemandas");

const contagemStatus = computed(() => store.countsPorStatus.value);

const demandasFiltradas = computed(() => {
  let resultado = store.demandas.value;
  
  // Filtro por status
  if (filtroStatusAtivo.value) {
    resultado = resultado.filter((item) => {
      const statusSlug = item.statusSlug || "pendente";
      return statusSlug === filtroStatusAtivo.value;
    });
  }
  
  // Filtro por busca
  const query = termoBusca.value.trim().toLowerCase();
  if (query) {
    resultado = resultado.filter((item) => {
      const titulo = item.titulo?.toLowerCase() || "";
      const descricao = item.descricao?.toLowerCase() || "";
      return titulo.includes(query) || descricao.includes(query);
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

function togglePesquisa() {
  if (route.name !== "GestaoDemandas") {
    router.push({ name: "GestaoDemandas" }).then(() => {
      searchAtiva.value = true;
      nextTick(() => searchInput.value?.focus());
    });
    return;
  }

  searchAtiva.value = !searchAtiva.value;
  if (searchAtiva.value) {
    nextTick(() => searchInput.value?.focus());
  } else {
    termoBusca.value = "";
  }
}

function irParaFavoritos() {
  if (route.name === "FavoritosDemandas") {
    router.push({ name: "GestaoDemandas" });
  } else {
    router.push({ name: "FavoritosDemandas" });
  }
}

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

function toggleFavorito(id) {
  store.toggleFavorito(id);
}

function limparBusca() {
  termoBusca.value = "";
  nextTick(() => searchInput.value?.focus());
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

watch(
  () => route.name,
  (nomeAtual) => {
    if (nomeAtual !== "GestaoDemandas") {
      searchAtiva.value = false;
      termoBusca.value = "";
      filtroStatusAtivo.value = null; // Reset filtro de status ao mudar de rota
    }
  }
);

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
  await atualizarStatus(demandaId, newStatus);
  draggedDemanda.value = null;
}

async function atualizarStatus(id, novoStatus) {
  try {
    await store.updateStatus(id, novoStatus);
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
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=K2D:wght@400&display=swap");

.gestao-demandas {
  padding: 20px 24px 48px;
  font-family: "Poppins", sans-serif;
  color: #000;
  background: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.title-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1565c0 0%, #163b66 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.title-image {
  width: 24px;
  height: 24px;
}

.top-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.top-icon-button {
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 50%;
  background: #f7f8fd;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.top-icon-button:hover,
.top-icon-button.ativo {
  transform: translateY(-2px);
  background: #eef3ff;
  box-shadow: 0 10px 18px rgba(21, 101, 192, 0.12);
}

.top-icon-button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(21, 101, 192, 0.25);
}

.top-icon {
  width: 24px;
  height: 24px;
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

.search-bar {
  width: min(480px, 100%);
  background: #f7f8fd;
  border-radius: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  box-shadow: inset 0 0 0 1px rgba(21, 101, 192, 0.08);
  margin-bottom: 32px;
}

.search-icon {
  width: 20px;
  height: 20px;
}

.search-bar input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 15px;
  color: #23303f;
  outline: none;
}

.search-bar input::placeholder {
  color: #8b95a5;
}

.search-clear {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: rgba(21, 101, 192, 0.12);
  color: #0f4a92;
  font-size: 18px;
  line-height: 1;
  display: grid;
  place-items: center;
  cursor: pointer;
}

.search-clear:hover {
  background: rgba(21, 101, 192, 0.2);
}

.status-cards {
  display: flex;
  gap: 20px;
  margin: 0 auto 48px;
  max-width: 1000px;
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
  max-width: 1000px;
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
  max-width: 1000px;
  min-height: 191px;
  border-radius: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  padding: 24px 24px 24px 24px;
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
