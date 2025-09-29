<template>
  <div class="page">
    <form class="card" @submit.prevent="salvarAcao">
      <header class="card__header">
        <div>
          <h1>Cadastrar acao</h1>
          <p>Registre a iniciativa com os dados principais para organizar responsabilidades e prazos.</p>
        </div>
        <div class="card__actions">
          <button type="button" class="btn ghost" @click="voltar">Cancelar</button>
          <button type="submit" class="btn primary">Salvar</button>
        </div>
      </header>

      <section class="group">
        <label class="field">
          <span>Titulo *</span>
          <input v-model="titulo" type="text" placeholder="Informe o titulo" required />
        </label>
        <label class="field">
          <span>Descricao *</span>
          <textarea v-model="descricao" rows="4" placeholder="Explique objetivo e etapas" required></textarea>
        </label>
      </section>

      <section class="group">
        <div class="grid two">
          <label class="field">
            <span>Responsavel</span>
            <input v-model="solicitante" type="text" placeholder="Quem lidera a acao?" />
          </label>
          <label class="field">
            <span>Contato</span>
            <input v-model="contato" type="text" placeholder="Email ou telefone" />
          </label>
        </div>

        <div class="grid two">
          <label class="field">
            <span>Local</span>
            <input v-model="local" type="text" placeholder="Onde ocorrera?" />
          </label>
          <label class="field">
            <span>Data</span>
            <input v-model="data" type="date" />
          </label>
        </div>

        <label class="field field--shrink">
          <span>Status</span>
          <select v-model="status">
            <option value="Pendente">Pendente</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Concluida">Concluida</option>
          </select>
        </label>
      </section>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useDemandasStore } from "../stores/useDemandasStore";

const router = useRouter();
const store = useDemandasStore();

const titulo = ref("");
const descricao = ref("");
const solicitante = ref("");
const contato = ref("");
const local = ref("");
const data = ref("");
const status = ref("Pendente");

function salvarAcao() {
  store.addAcao({
    titulo: titulo.value,
    descricao: descricao.value,
    solicitante: solicitante.value,
    contato: contato.value,
    local: local.value,
    data: data.value,
    status: status.value,
  });

  limparFormulario();
  router.push("/gestao-demandas");
}

function limparFormulario() {
  titulo.value = "";
  descricao.value = "";
  solicitante.value = "";
  contato.value = "";
  local.value = "";
  data.value = "";
  status.value = "Pendente";
}

function voltar() {
  router.push("/gestao-demandas");
}
</script>

<style scoped>
.page {
  min-height: calc(100vh - 96px);
  padding: 96px 24px 72px;
  background: linear-gradient(180deg, #f5f7fb 0%, #ffffff 100%);
  display: flex;
  justify-content: center;
  box-sizing: border-box;
}

.card {
  width: min(820px, 100%);
  background: #ffffff;
  border-radius: 24px;
  padding: 36px;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.1);
  border: 1px solid rgba(148, 163, 184, 0.16);
  display: flex;
  flex-direction: column;
  gap: 26px;
}

.card__header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
}

.card__header h1 {
  margin: 0 0 8px;
  font-size: 26px;
  font-weight: 600;
  color: #0f172a;
}

.card__header p {
  margin: 0;
  color: #55637a;
  font-size: 14px;
}

.card__actions {
  display: flex;
  gap: 12px;
}

.group {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.grid.two {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 13px;
  color: #475569;
}

.field--shrink {
  max-width: 220px;
}

.field input,
.field textarea,
.field select {
  width: 100%;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid rgba(148, 163, 184, 0.35);
  background: #f8fafc;
  font-size: 14px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.field textarea {
  resize: vertical;
  min-height: 120px;
}

.field input:focus,
.field textarea:focus,
.field select:focus {
  border-color: #2563eb;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.16);
  outline: none;
}

.btn {
  border: none;
  border-radius: 999px;
  padding: 12px 22px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.btn.primary {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: #fff;
  box-shadow: 0 12px 24px rgba(37, 99, 235, 0.22);
}

.btn.primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 16px 28px rgba(37, 99, 235, 0.28);
}

.btn.ghost {
  background: transparent;
  color: #1d4ed8;
}

.btn.ghost:hover {
  color: #0f172a;
}

@media (max-width: 720px) {
  .card {
    padding: 28px;
  }

  .card__header {
    flex-direction: column;
    align-items: stretch;
  }

  .grid.two {
    grid-template-columns: 1fr;
  }

  .field--shrink {
    max-width: none;
  }
}
</style>

