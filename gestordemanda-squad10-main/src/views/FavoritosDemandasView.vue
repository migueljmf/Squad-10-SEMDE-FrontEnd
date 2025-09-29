<template>
  <div class="gestao-demandas">
    <div class="header">
      <div class="title">
        <div class="title-icon">
          <IconStar class="title-image" aria-hidden="true" />
        </div>
        <h2>Favoritos</h2>
      </div>
      <button type="button" class="btn-voltar" @click="voltar">
        <span class="btn-voltar-arrow">&larr;</span>
        <span>Voltar</span>
      </button>
    </div>

    <div class="search-bar">
      <IconSearch class="search-icon" aria-hidden="true" />
      <input
        v-model="termoBusca"
        type="search"
        placeholder="Buscar favoritos"
        aria-label="Buscar favoritos"
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

    <section class="demandas-list">
      <p v-if="demandasFormatadas.length === 0" class="empty-state">
        Nenhuma demanda favoritada ate o momento.
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
            <button type="button" class="action-button" aria-label="Editar" @click.stop="editarDemanda(demanda.id)">
              <img :src="iconPencil" alt="Editar" class="action-icon" />
            </button>
            <button type="button" class="action-button" aria-label="Excluir" @click.stop="removerDemanda(demanda.id)">
              <img :src="iconTrash" alt="Excluir" class="action-icon" />
            </button>
            <button type="button" class="action-button favorito ativo" aria-label="Desfavoritar" @click.stop="toggleFavorito(demanda.id)">
              <img :src="iconHeart" alt="Desfavoritar" class="action-icon" />
            </button>
          </div>
        </article>
      </template>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import iconPencil from "@/assets/fi-ss-pencil.svg?url";
import iconTrash from "@/assets/fi-ss-trash.svg?url";
import iconHeart from "@/assets/fi-ss-heart.svg?url";
import iconMarker from "@/assets/fi-ss-marker.svg?url";
import IconStar from "@/assets/star.svg?component";
import IconSearch from "@/assets/Group.svg?component";
import { useDemandasStore } from "../stores/useDemandasStore";

const router = useRouter();
const store = useDemandasStore();

const termoBusca = ref("");

const demandasFormatadas = computed(() => {
  const query = termoBusca.value.trim().toLowerCase();
  return store.favoritos.value
    .filter((item) => {
      if (!query) return true;
      const titulo = item.titulo?.toLowerCase() || "";
      const descricao = item.descricao?.toLowerCase() || "";
      return titulo.includes(query) || descricao.includes(query);
    })
    .map((item) => {
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
    });
});


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

function voltar() {
  router.back();
}

function limparBusca() {
  termoBusca.value = "";
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
  background: linear-gradient(135deg, #ffcc33 0%, #ff9800 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.title-image {
  width: 24px;
  height: 24px;
}

.btn-voltar {
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  background: #1565c0;
  color: #fff;
  padding: 10px 18px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 12px 24px rgba(21, 101, 192, 0.24);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn-voltar:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 28px rgba(21, 101, 192, 0.3);
}

.btn-voltar:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.65);
}

.btn-voltar-arrow {
  font-size: 18px;
  line-height: 1;
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
  display: grid;
  place-items: center;
  line-height: 1;
  cursor: pointer;
}

.search-clear:hover {
  background: rgba(21, 101, 192, 0.2);
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
  background-color: #ffd54f;
  color: #2f2f2f;
}

.badge-type.type-acao {
  background: #ffab91;
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
  font-family: "Poppins", sans-serif;
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
  font-family: "Poppins", sans-serif;
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
  font-family: "Poppins", sans-serif;
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
  transition: opacity 0.2s ease;
}

.action-button.favorito .action-icon {
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

