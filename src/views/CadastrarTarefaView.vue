<template>
  <div class="page-wrapper">
    <div class="cadastro-container">
      <header class="cadastro-header">
        <h1>Cadastrar tarefa</h1>
        <p>Organize as demandas registrando os detalhes da nova tarefa.</p>
      </header>

      <form class="cadastro-form" @submit.prevent="salvarTarefa">
        <div class="form-group">
          <label for="titulo">Titulo da tarefa</label>
          <input id="titulo" v-model="titulo" type="text" placeholder="Digite o titulo da tarefa" />
        </div>

        <div class="form-group">
          <label for="descricao">Descricao detalhada</label>
          <textarea id="descricao" v-model="descricao" placeholder="Descreva a solicitacao"></textarea>
        </div>

        <div class="form-group">
          <label for="solicitante">Nome do solicitante</label>
          <input id="solicitante" v-model="solicitante" type="text" placeholder="Quem solicitou a tarefa?" />
        </div>

        <div class="form-grid">
          <div class="form-group">
            <label for="endereco">Endereco</label>
            <input id="endereco" v-model="endereco" type="text" placeholder="Digite o endereco" />
          </div>

          <div class="form-group">
            <label for="categoria">Categoria</label>
            <select id="categoria" v-model="categoria">
              <option value="">Selecione</option>
              <option value="Infraestrutura">Infraestrutura</option>
              <option value="Limpeza">Limpeza</option>
              <option value="Seguranca">Seguranca</option>
            </select>
          </div>
        </div>

        <div class="form-grid">
          <div class="form-group">
            <label for="data">Data da solicitacao</label>
            <input id="data" type="date" v-model="data" />
          </div>

          <div class="form-group">
            <label for="status">Status</label>
            <select id="status" v-model="status">
              <option value="Pendente">Pendente</option>
              <option value="Em andamento">Em andamento</option>
              <option value="Concluida">Concluida</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label for="anexo">Anexos</label>
          <input id="anexo" type="file" multiple />
        </div>

        <div class="form-actions">
          <button type="button" class="btn btn-secondary" @click="voltar">Cancelar</button>
          <button type="submit" class="btn btn-primary">Salvar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const titulo = ref("");
const descricao = ref("");
const solicitante = ref("");
const endereco = ref("");
const categoria = ref("");
const data = ref("");
const status = ref("Pendente");

function salvarTarefa() {
  alert(`Tarefa "${titulo.value}" criada com sucesso!`);
  router.push("/gestao-demandas");
}

function voltar() {
  router.push("/gestao-demandas");
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");

.page-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, #f0f4ff 0%, #f8fbff 100%);
}

.cadastro-container {
  width: min(960px, 100%);
  background: #fff;
  border-radius: 20px;
  padding: 48px;
  box-shadow: 0 24px 40px rgba(21, 101, 192, 0.12);
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: "Poppins", sans-serif;
}

.cadastro-header h1 {
  font-size: 32px;
  font-weight: 600;
  color: #0f1d40;
  margin-bottom: 8px;
}

.cadastro-header p {
  font-size: 15px;
  color: #5a6473;
  margin: 0;
}

.cadastro-form {
  display: grid;
  gap: 24px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 13px;
  font-weight: 500;
  color: #555;
  letter-spacing: 0.3px;
  text-transform: uppercase;
}

.form-group input,
.form-group textarea,
.form-group select {
  border: 1px solid #d6deea;
  border-radius: 12px;
  padding: 14px 16px;
  font-size: 15px;
  color: #1b2a4a;
  background: #f9fbff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  border-color: #1565c0;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(21, 101, 192, 0.15);
  outline: none;
}

textarea {
  min-height: 140px;
  resize: vertical;
}

input[type="file"] {
  background: #fff;
  cursor: pointer;
}

input[type="file"]::file-selector-button {
  background: #1565c0;
  border: none;
  color: #fff;
  padding: 10px 16px;
  border-radius: 10px;
  margin-right: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
}

input[type="file"]::file-selector-button:hover {
  background: #0f4a92;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 8px;
}

.btn {
  border: none;
  border-radius: 12px;
  padding: 12px 28px;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.3px;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.btn:active {
  transform: translateY(1px);
}

.btn-primary {
  background: #43a047;
  color: #fff;
  box-shadow: 0 12px 20px rgba(67, 160, 71, 0.24);
}

.btn-primary:hover {
  background: #388e3c;
}

.btn-secondary {
  background: #e0e7ef;
  color: #2f3a4f;
}

.btn-secondary:hover {
  background: #c8d0da;
}

@media (max-width: 768px) {
  .cadastro-container {
    padding: 32px 24px;
  }

  .cadastro-header h1 {
    font-size: 26px;
  }
}

@media (max-width: 520px) {
  .form-actions {
    width: 100%;
    justify-content: stretch;
  }

  .btn {
    width: 100%;
    text-align: center;
  }
}
</style>
