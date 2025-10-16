<template>
  <transition name="fade-slide">
    <div v-if="visible" class="search-bar">
      <img :src="icon" alt="Buscar" class="search-icon" />
      <input
        ref="inputRef"
        v-model="model"
        type="search"
        placeholder="Buscar por titulo ou descricao"
        aria-label="Campo de busca"
      />
      <button
        v-if="model"
        type="button"
        class="search-clear"
        aria-label="Limpar busca"
        @click="clear"
      >
        &times;
      </button>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch, defineExpose } from 'vue';
const props = defineProps({
  modelValue: { type: String, default: '' },
  icon: { type: String, default: '' },
  visible: { type: Boolean, default: true }
});
const emit = defineEmits(['update:modelValue','clear']);

const inputRef = ref(null);
const model = ref(props.modelValue);

watch(() => props.modelValue, (v) => { model.value = v });
watch(model, (v) => emit('update:modelValue', v));

function clear() {
  emit('update:modelValue', '');
  emit('clear');
}

function focus() { inputRef.value?.focus(); }
defineExpose({ focus });
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.fade-slide-enter-from,
.fade-slide-leave-to { opacity: 0; transform: translateY(-8px); }
.search-bar { width: min(480px, 100%); background: #f7f8fd; border-radius: 14px; display: flex; align-items: center; gap: 12px; padding: 12px 16px; box-shadow: inset 0 0 0 1px rgba(21,101,192,0.08); margin-bottom: 32px; }
.search-icon { width: 20px; height: 20px; }
.search-bar input { flex: 1; border: none; background: transparent; font-size: 15px; color: #23303f; outline: none; }
.search-bar input::placeholder { color: #8b95a5; }
.search-clear { width: 32px; height: 32px; border: none; border-radius: 50%; background: rgba(21,101,192,0.12); color: #0f4a92; font-size: 18px; line-height: 1; display: grid; place-items: center; cursor: pointer; }
.search-clear:hover { background: rgba(21,101,192,0.2); }
</style>
