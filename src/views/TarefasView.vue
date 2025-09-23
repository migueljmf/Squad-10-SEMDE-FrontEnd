<template>
  <div class="tarefas">
    <h1>Tarefas</h1>
    <button @click="$router.push('/cadastrar-tarefa')" class="nova-tarefa">
      + Nova Tarefa
    </button>
  </div>
</template>

<style scoped>
.nova-tarefa {
  background: #1565c0;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
}
</style>
