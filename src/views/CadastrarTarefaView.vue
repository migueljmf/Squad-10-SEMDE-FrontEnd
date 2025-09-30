<template>
  <div class="page">
    <form class="card" @submit.prevent="salvarTarefa">
      <header class="card__header">
        <div>
          <h1>Cadastrar tarefa</h1>
          <p>Informe os detalhes essenciais da demanda para que a equipe acompanhe o andamento.</p>
        </div>
        <div class="card__actions">
          <button type="button" class="btn ghost" @click="voltar">Cancelar</button>
          <button type="submit" class="btn primary">Salvar</button>
        </div>
      </header>

      <section class="group">
        <div class="grid two">
          <label class="field">
            <span>Titulo *</span>
            <input v-model="titulo" type="text" placeholder="Informe o titulo" required />
          </label>
          <label class="field">
            <span>Categoria</span>
            <select v-model="categoria">
              <option value="">Selecione</option>
              <option value="Infraestrutura">Infraestrutura</option>
              <option value="Limpeza">Limpeza</option>
              <option value="Seguranca">Seguranca</option>
            </select>
          </label>
        </div>

        <label class="field">
          <span>Descricao *</span>
          <textarea v-model="descricao" rows="4" placeholder="Descreva o que precisa ser resolvido" required></textarea>
        </label>
      </section>

      <section class="group">
        <div class="grid two">
          <label class="field">
            <span>Solicitante</span>
            <input v-model="solicitante" type="text" placeholder="Quem solicitou?" />
          </label>
          <label class="field">
            <span>Contato</span>
            <input v-model="contato" type="text" placeholder="Email ou telefone" />
          </label>
        </div>

        <div class="grid two">
          <label class="field">
            <span>Endereco / local</span>
            <input v-model="endereco" type="text" placeholder="Onde sera executada?" />
          </label>
          <label class="field">
            <span>Data prevista</span>
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

      <section class="group">
        <h2>Anexos</h2>
        <label class="upload">
          <input ref="anexoInput" type="file" multiple />
          <strong>Arraste arquivos ou clique para selecionar</strong>
          <span>PDF, imagens ou planilhas com ate 10 MB cada.</span>
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
const endereco = ref("");
const categoria = ref("");
const data = ref("");
const status = ref("Pendente");
const anexoInput = ref(null);

function limparFormulario() {
  titulo.value = "";
  descricao.value = "";
  solicitante.value = "";
  contato.value = "";
  endereco.value = "";
  categoria.value = "";
  data.value = "";
  status.value = "Pendente";
  if (anexoInput.value) {
    anexoInput.value.value = "";
  }
}

function salvarTarefa() {
  const anexos = Array.from(anexoInput.value?.files || []).map((arquivo) => ({
    nome: arquivo.name,
    tamanho: arquivo.size,
    tipo: arquivo.type,
  }));

  store.addTarefa({
    titulo: titulo.value,
    descricao: descricao.value,
    solicitante: solicitante.value,
    contato: contato.value,
    endereco: endereco.value,
    categoria: categoria.value,
    data: data.value,
    status: status.value,
    anexos,
  });

  limparFormulario();
  router.push("/gestao-demandas");
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
  width: min(810px, 100%);
  background: #ffffff;
  border-radius: 26px;
  padding: 40px 44px;
  box-shadow: 0 24px 48px rgba(15, 23, 42, 0.1);
  border: 1px solid rgba(148, 163, 184, 0.18);
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.card__header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
}

.card__header h1 {
  margin: 0 0 8px;
  font-size: 28px;
  font-weight: 700;
  color: #0f172a;
}

.card__header p {
  margin: 0;
  color: #475569;
  font-size: 15px;
  line-height: 1.4;
}

.card__actions {
  display: flex;
  gap: 12px;
}

.group {
  display: flex;
  flex-direction: column;
  gap: 40px; /* mais respiro entre blocos */
}

.grid.two {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 36px; /* mais espaço entre colunas */
}

.field {
  display: flex;
  flex-direction: column;
  gap: 14px; /* mais espaço entre label e input */
  font-size: 14px;
  color: #475569;
}

.field--shrink {
  max-width: 330px;
}

.field input,
.field textarea,
.field select {
  width: 100%;
  padding: 14px 16px; /* inputs mais confortáveis */
  border-radius: 14px;
  border: 1px solid rgba(148, 163, 184, 0.35);
  background: #f8fafc;
  font-size: 15px;
  line-height: 1.5;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.field textarea {
  resize: vertical;
  min-height: 160px; /* textarea mais alto */
}

.field input:focus,
.field textarea:focus,
.field select:focus {
  border-color: #2563eb;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.16);
  outline: none;
}

.upload {
  position: relative;
  border: 1px dashed rgba(37, 99, 235, 0.35);
  border-radius: 18px;
  background: #f9fbff; /* mais leve que o azul forte */
  padding: 28px;
  text-align: center;
  color: #1d4ed8;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.upload input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}

.upload strong {
  font-size: 15px;
}

.upload span {
  font-size: 13px;
  color: #4b5563;
}

.btn {
  border: none;
  border-radius: 999px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.2s ease;
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
  border: 1px solid #1d4ed8;
}

.btn.ghost:hover {
  color: #0f172a;
  border-color: #0f172a;
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
    gap: 24px;
  }

  .field--shrink {
    max-width: none;
  }
}

</style>
