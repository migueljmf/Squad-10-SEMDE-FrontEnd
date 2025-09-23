<template>
  <div class="tarefas">
    <button @click="$router.push('/cadastrar-tarefa')" class="nova-tarefa">
      + Nova Tarefa
    </button>
  </div>
</template>

<style scoped>
.nova-tarefa {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 1100;
  background: #1565c0;
  color: #fff;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 6px 14px rgba(0,0,0,0.18);
}

@media (max-width: 640px) {
  .nova-tarefa {
    right: 16px;
    bottom: 16px;
  }
}
</style>
