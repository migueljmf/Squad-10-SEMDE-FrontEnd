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
      <div class="card pendente">
        <span class="count-badge">{{ contagemStatus.pendente }}</span>
        <p class="card-title">Pendentes</p>
      </div>
      <div class="card andamento">
        <span class="count-badge">{{ contagemStatus.andamento }}</span>
        <p class="card-title">Em andamento</p>
      </div>
      <div class="card concluido">
        <span class="count-badge">{{ contagemStatus.concluido }}</span>
        <p class="card-title">Concluidas</p>
      </div>
    </section>

    <section class="demandas-list">
      <p v-if="demandasFormatadas.length === 0" class="empty-state">
        Nenhuma demanda encontrada. Ajuste os filtros ou cadastre uma nova tarefa/acao.
      </p>
      <template v-else>
        <article
          v-for="demanda in demandasFormatadas"
          :key="demanda.id"
          class="demanda-card"
          role="button"
          tabindex="0"
          @click="abrirDetalhe(demanda.id)"
          @keyup.enter="abrirDetalhe(demanda.id)"
        >
          <span class="badge badge-type" :class="['type-' + demanda.tipoClass]">
            {{ demanda.tipo }}
          </span>
          <span class="badge badge-status" :class="['status-' + demanda.statusClass]">
            {{ demanda.status }}
          </span>

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
import { computed, ref, nextTick, watch } from "vue";
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

watch(
  () => route.name,
  (nomeAtual) => {
    if (nomeAtual !== "GestaoDemandas") {
      searchAtiva.value = false;
      termoBusca.value = "";
    }
  }
);

const estaNosFavoritos = computed(() => route.name === "FavoritosDemandas");

const contagemStatus = computed(() => store.countsPorStatus.value);

const demandasFiltradas = computed(() => {
  const query = termoBusca.value.trim().toLowerCase();
  if (!query) return store.demandas.value;
  return store.demandas.value.filter((item) => {
    const titulo = item.titulo?.toLowerCase() || "";
    const descricao = item.descricao?.toLowerCase() || "";
    return titulo.includes(query) || descricao.includes(query);
  });
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

function abrirDetalhe(id) {
  router.push({ name: "DetalheTarefa", params: { id } });
}

function editarDemanda(id) {
  router.push({ name: "EditarTarefa", params: { id } });
}

function removerDemanda(id) {
  const demanda = store.getById(id);
  const titulo = demanda?.titulo || "esta demanda";
  if (window.confirm(`Deseja realmente excluir ${titulo}?`)) {
    store.removeDemanda(id);
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
  height: 191px;
  border-radius: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.demanda-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(21, 101, 192, 0.16);
}

.badge {
  position: absolute;
  top: 22px;
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
  right: 186px;
  background-color: #a8ffb8;
  color: #000;
}

.badge-type.type-acao {
  background: #ce93d8;
}

.badge-status {
  right: 12px;
  background-color: #fddc9c;
  color: #fba441;
}

.badge-status.status-em-andamento,
.badge-status.status-andamento {
  background: #90caf9;
  color: #1565c0;
}

.badge-status.status-concluida,
.badge-status.status-concluido {
  background: #c8e6c9;
  color: #2e7d32;
}

.demanda-title {
  position: absolute;
  top: 30px;
  left: 40px;
  font-family: "Inter", sans-serif;
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  max-width: 60%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.demanda-description {
  position: absolute;
  top: 84px;
  left: 40px;
  right: 220px;
  font-family: "K2D", sans-serif;
  font-size: 20px;
  color: #525252;
  margin: 0;
  max-height: 60px;
  overflow: hidden;
}

.demanda-meta {
  position: absolute;
  top: 134px;
  left: 40px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  color: #636c7a;
}

.meta-icon {
  width: 18px;
  height: 18px;
}

.meta-separator {
  color: #9c9c9c;
}

.card-actions {
  position: absolute;
  right: 20px;
  bottom: 16px;
  display: flex;
  gap: 12px;
}

.action-button {
  width: 44px;
  height: 44px;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.action-button:hover {
  transform: scale(1.08);
}

.action-icon {
  width: 22px;
  height: 22px;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.action-button.favorito .action-icon {
  opacity: 0.45;
}

.action-button.favorito.ativo .action-icon {
  opacity: 1;
  filter: brightness(0) saturate(100%) invert(27%) sepia(83%) saturate(5923%) hue-rotate(345deg) brightness(96%) contrast(92%);
}

@media (max-width: 1100px) {
  .badge-type {
    right: 50%;
    transform: translateX(120%);
  }

  .badge-status {
    right: 24px;
  }
}

@media (max-width: 768px) {
  .status-cards {
    flex-direction: column;
    align-items: center;
  }

  .demanda-card {
    height: auto;
    padding: 120px 24px 80px;
  }

  .badge {
    position: static;
    margin-top: 16px;
  }

  .demanda-title,
  .demanda-description,
  .demanda-meta,
  .card-actions {
    position: static;
    transform: none;
  }

  .demanda-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .demanda-description {
    max-height: none;
  }

  .card-actions {
    align-self: flex-end;
  }

  .action-button {
    width: 36px;
    height: 36px;
  }
}
</style>
