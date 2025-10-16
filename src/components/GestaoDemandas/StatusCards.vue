<template>
  <section class="status-cards">
    <div class="card pendente drop-zone-card"
      :class="{ 'drag-over': dragOver === 'pendente', 'filtro-ativo': filtro === 'pendente' }"
      @click="$emit('toggle', 'pendente')" @dragover.prevent="handleDragOver('pendente')" @dragleave="handleDragLeave"
      @drop="handleDrop($event, 'pendente')">
      <span class="count-badge">{{ counts.pendente }}</span>
      <p class="card-title">Pendentes</p>
      <div v-if="dragOver === 'pendente'" class="drop-hint">Solte aqui para marcar como Pendente</div>
    </div>

    <div class="card andamento drop-zone-card"
      :class="{ 'drag-over': dragOver === 'em-andamento', 'filtro-ativo': filtro === 'em-andamento' }"
      @click="$emit('toggle', 'em-andamento')" @dragover.prevent="handleDragOver('em-andamento')"
      @dragleave="handleDragLeave" @drop="handleDrop($event, 'em-andamento')">
      <span class="count-badge">{{ counts.andamento }}</span>
      <p class="card-title">Em andamento</p>
      <div v-if="dragOver === 'em-andamento'" class="drop-hint">Solte aqui para marcar como Em Andamento</div>
    </div>

    <div class="card concluido drop-zone-card"
      :class="{ 'drag-over': dragOver === 'concluida', 'filtro-ativo': filtro === 'concluido' }"
      @click="$emit('toggle', 'concluido')" @dragover.prevent="handleDragOver('concluida')" @dragleave="handleDragLeave"
      @drop="handleDrop($event, 'concluido')">
      <span class="count-badge">{{ counts.concluido }}</span>
      <p class="card-title">Concluidas</p>
      <div v-if="dragOver === 'concluida'" class="drop-hint">Solte aqui para marcar como Concluída</div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({ counts: { type: Object, required: true }, filtro: { type: String, default: null } });
const emit = defineEmits(['toggle', 'drop']);
const dragOver = ref(null);

function handleDragOver(zone) { dragOver.value = zone; }
function handleDragLeave() { dragOver.value = null; }
function handleDrop(event, zone) {
  // Clear local hover state immediately so UI updates before parent handlers run
  dragOver.value = null;
  // forward event to parent for processing
  emit('drop', event, zone);
}
</script>

<style scoped>
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
</style>
