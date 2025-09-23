<template>
  <div class="cadastro-tarefa">
    <h1>Cadastro de Tarefas</h1>

    <form @submit.prevent="salvarTarefa">
      <input v-model="titulo" placeholder="Título da tarefa" />
      <textarea v-model="descricao" placeholder="Descrição detalhada"></textarea>
      <input v-model="local" placeholder="Local" />
      <input type="date" v-model="data" />
      <select v-model="status">
        <option>Pendente</option>
        <option>Em andamento</option>
        <option>Concluída</option>
      </select>

      <button type="submit">Salvar</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const titulo = ref("");
const descricao = ref("");
const local = ref("");
const data = ref("");
const status = ref("Pendente");

function salvarTarefa() {
  // Aqui futuramente salva no backend
  alert(`Tarefa "${titulo.value}" criada com sucesso!`);

  // Redireciona para Gestão de Demandas
  router.push("/gestao-demandas");
}
</script>
