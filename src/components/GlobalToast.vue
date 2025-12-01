<template>
  <div class="global-toast" aria-live="polite">
    <transition-group name="toast" tag="div">
      <div v-for="t in store.state.toasts" :key="t.id" :class="['toast', t.type]">
        <div class="toast-content">
          <strong class="toast-type">{{ titleFor(t.type) }}</strong>
          <div class="toast-message">{{ t.message }}</div>
        </div>
        <button class="toast-close" @click="remove(t.id)">×</button>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { notificationStore as store } from '@/stores/notificationStore'

function remove(id) {
  store.remove(id)
}

function titleFor(type) {
  if (type === 'success') return 'Sucesso'
  if (type === 'error') return 'Erro'
  return 'Info'
}
</script>

<style scoped>
.global-toast {
  position: fixed;
  right: 20px;
  top: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.toast-enter-active, .toast-leave-active {
  transition: all 240ms ease;
}
.toast-enter-from, .toast-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}

.toast {
  min-width: 260px;
  max-width: 420px;
  background: #fff;
  border-radius: 12px;
  padding: 12px 14px;
  box-shadow: 0 12px 32px rgba(12, 36, 75, 0.14);
  border: 1px solid rgba(15, 23, 42, 0.06);
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.toast.success {
  border-left: 4px solid #16a34a;
}
.toast.error {
  border-left: 4px solid #dc2626;
}
.toast.info {
  border-left: 4px solid #2563eb;
}

.toast-content { flex: 1 }
.toast-type { display:block; font-weight:700; font-size:13px; color:#0f172a ;font-family: "Poppins";}
.toast-message { margin-top:6px; font-size:13px; color:#334155;font-family: "Poppins";}
.toast-close { background:transparent; border:none; font-size:18px; line-height:1; cursor:pointer; color:#475569 }
</style>
