<template>
  <div class="cadastro-container">
    <div class="cadastro-header">
      <h2>✔ Cadastrar Ação</h2>
    </div>

    <form class="cadastro-form" @submit.prevent="salvarAcao">
      <!-- Título da Ação -->
      <div class="form-group">
        <label for="titulo">Título da Ação</label>
        <input id="titulo" v-model="titulo" type="text" placeholder="Digite o título da ação" />
      </div>

      <!-- Descrição -->
      <div class="form-group">
        <label for="descricao">Descrição Detalhada</label>
        <textarea id="descricao" v-model="descricao" placeholder="Digite a descrição detalhada"></textarea>
      </div>

      <!-- Local da Ação -->
      <div class="form-group">
        <label for="local">Local</label>
        <input id="local" v-model="local" type="text" placeholder="Digite o local da ação" />
      </div>

      <!-- Data e Status -->
      <div class="form-row">
        <div class="form-group">
          <label for="data">Data da Ação</label>
          <input id="data" type="date" v-model="data" />
        </div>

        <div class="form-group">
          <label for="status">Status</label>
          <select id="status" v-model="status">
            <option value="Pendente">Pendente</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Concluída">Concluída</option>
          </select>
        </div>
      </div>

      <!-- Botões -->
      <div class="form-actions">
        <button type="button" class="btn-cancel" @click="voltar">Cancelar</button>
        <button type="submit" class="btn-save">Salvar</button>
      </div>
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

function salvarAcao() {
  alert(`Ação "${titulo.value}" criada com sucesso!`);
  router.push("/gestao-demandas");
}

function voltar() {
  router.push("/gestao-demandas");
}
</script>

<style scoped>
.cadastro-container {
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);

  /* Dimensões fixas */
  width: 1000px;
  height: 827px;

  /* Centraliza na tela */
  margin: 0 auto;
}

.cadastro-header h2 {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 20px;
}

.cadastro-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-row {
  display: flex;
  gap: 20px;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea,
.form-group select {
  border: 1px solid #1565c0;
  border-radius: 6px;
  padding: 10px;
  font-size: 14px;
  outline: none;
}

textarea {
  min-height: 100px;
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn-cancel {
  background: #e0e0e0;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
}

.btn-save {
  background: #43a047;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
}

.btn-save:hover {
  background: #388e3c;
}
</style>
