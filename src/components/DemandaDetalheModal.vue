<template>
  <transition name="modal-fade">
    <div
      v-if="open"
      class="modal-overlay"
      role="dialog"
      aria-modal="true"
      @click.self="$emit('close')"
    >
      <div class="modal-card">
        <button type="button" class="modal-close" aria-label="Fechar" @click="$emit('close')">
          &times;
        </button>

        <div v-if="detalhe" class="modal-content">
          <header class="modal-header">
            <div class="header-texts">
              <h1>{{ detalhe.tituloCabecalho }}</h1>
              <p>{{ detalhe.titulo }}</p>
            </div>
            <span class="status-tag" :class="['status-' + detalhe.statusClass]">
              {{ detalhe.statusTag }}
            </span>
          </header>

          <div class="modal-body">
            <div class="info-grid">
              <div
                v-for="item in detalhe.infoItems"
                :key="item.label"
                class="info-item"
              >
                <span class="info-label">{{ item.label }}</span>
                <span class="info-value">{{ item.value }}</span>
              </div>
            </div>

            <section class="modal-section">
              <h2>Descricao completa</h2>
              <p>{{ detalhe.descricao || "Sem descricao adicional." }}</p>
            </section>

            <section class="modal-section">
              <h2>Anexos</h2>
              <ul v-if="anexos.length" class="anexos-list">
                <li v-for="arquivo in anexos" :key="arquivo.nome" class="anexo-item">
                  <mdicon name="paperclip" :size="18" />
                  <span class="anexo-nome">{{ arquivo.nome }}</span>
                  <small class="anexo-tamanho" v-if="arquivo.tamanho">
                    {{ formatarTamanho(arquivo.tamanho) }}
                  </small>
                </li>
              </ul>
              <p v-else class="anexos-empty">Nenhum anexo enviado.</p>
            </section>
          </div>
        </div>

        <div v-else class="modal-content vazio">
          <h1>Demanda nao encontrada</h1>
          <p>A demanda solicitada pode ter sido removida ou ainda nao foi cadastrada.</p>
          <button type="button" class="btn" @click="$emit('close')">Fechar</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed } from "vue";
import mdicon from "mdi-vue/v3";

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  detalhe: {
    type: Object,
    default: null,
  },
});

defineEmits(["close"]);

const anexos = computed(() => props.detalhe?.anexos || []);

function formatarTamanho(bytes) {
  if (!bytes) return "";
  const unidades = ["B", "KB", "MB", "GB"];
  let tamanho = bytes;
  let indice = 0;
  while (tamanho >= 1024 && indice < unidades.length - 1) {
    tamanho /= 1024;
    indice += 1;
  }
  return `${tamanho.toFixed(indice === 0 ? 0 : 1)} ${unidades[indice]}`;
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(14, 23, 42, 0.55);
  backdrop-filter: blur(6px);
  display: grid;
  place-items: center;
  padding: clamp(16px, 5vw, 48px);
  z-index: 1100;
}

.modal-card {
  position: relative;
  width: min(900px, 100%);
  max-height: 90vh;
  overflow-y: auto;
  background: linear-gradient(135deg, #ffffff 0%, #f6f8ff 100%);
  border-radius: 28px;
  box-shadow: 0 32px 60px rgba(8, 18, 36, 0.35);
}

.modal-close {
  position: absolute;
  top: 18px;
  right: 18px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: none;
  background: rgba(15, 40, 75, 0.06);
  color: #0f284b;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.modal-close:hover {
  background: rgba(15, 40, 75, 0.14);
  transform: translateY(-1px);
}

.modal-content {
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
  padding: 48px 48px 32px;
}

.header-texts h1 {
  margin: 0;
  font-size: 28px;
  color: #101d33;
}

.header-texts p {
  margin: 6px 0 0;
  font-size: 18px;
  color: #475066;
}

.status-tag {
  padding: 10px 18px;
  border-radius: 999px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.status-tag.status-pendente {
  background: rgba(255, 193, 7, 0.2);
  color: #8c6405;
}

.status-tag.status-em-andamento,
.status-tag.status-andamento {
  background: rgba(41, 121, 255, 0.22);
  color: #0f357a;
}

.status-tag.status-concluida,
.status-tag.status-concluido {
  background: rgba(76, 175, 80, 0.22);
  color: #1f6331;
}

.modal-body {
  padding: 0 48px 48px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.info-item {
  background: #fff;
  border-radius: 16px;
  padding: 16px 18px;
  box-shadow: 0 14px 28px rgba(16, 35, 59, 0.1);
}

.info-label {
  display: block;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #687286;
  margin-bottom: 6px;
  font-weight: 600;
}

.info-value {
  font-size: 15px;
  color: #1a2740;
  font-weight: 500;
}

.modal-section h2 {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 600;
  color: #14263c;
}

.modal-section p {
  margin: 0;
  font-size: 16px;
  line-height: 1.6;
  color: #46505f;
}

.anexos-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.anexo-item {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f2f5ff;
  border-radius: 12px;
  padding: 12px 16px;
  color: #1f2a3c;
}

.anexo-nome {
  font-weight: 500;
}

.anexo-tamanho {
  color: #6d7685;
}

.anexos-empty {
  margin: 0;
  font-size: 15px;
  color: #6d7685;
}

.modal-content.vazio {
  align-items: center;
  gap: 16px;
  padding: 64px 32px;
  text-align: center;
}

.modal-content.vazio h1 {
  margin: 0;
  font-size: 28px;
  color: #12345b;
}

.modal-content.vazio p {
  margin: 0;
  font-size: 16px;
  color: #5a6274;
}

.btn {
  border: none;
  border-radius: 12px;
  padding: 12px 28px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  background: #1565c0;
  color: #ffffff;
  box-shadow: 0 12px 24px rgba(21, 101, 192, 0.24);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 28px rgba(21, 101, 192, 0.3);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .modal-card {
    border-radius: 20px;
  }

  .modal-header {
    padding: 40px 28px 24px;
    flex-direction: column;
    align-items: flex-start;
  }

  .modal-body {
    padding: 0 28px 32px;
  }
}
</style>
