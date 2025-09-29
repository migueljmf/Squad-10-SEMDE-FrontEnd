<template>
  <section class="create-page">
    <div class="create-card">
      <aside class="create-card__info">
        <span class="create-card__badge">Nova tarefa</span>
        <h1>Cadastro de tarefa</h1>
        <p>Organize as demandas com detalhes claros para que equipes tenham contexto e prazo.</p>
        <ul class="info-list">
          <li>Registre titulo, categoria e status para facilitar os filtros.</li>
          <li>Inclua responsaveis e contatos para dar rapidez as respostas.</li>
          <li>Anexe documentos ou imagens relevantes ao andamento.</li>
        </ul>
      </aside>

      <form class="create-form" @submit.prevent="salvarTarefa">
        <div class="form-section">
          <header class="form-section__header">
            <h2 class="form-section__title">Informacoes principais</h2>
            <p class="form-section__hint">Defina identificacao, categoria e estagio da tarefa.</p>
          </header>
          <div class="field-grid">
            <label class="field field--full" for="titulo">
              <span>Titulo da tarefa</span>
              <input id="titulo" v-model="titulo" type="text" placeholder="Ex.: Reparo de iluminacao publica" required />
            </label>
            <label class="field" for="categoria">
              <span>Categoria</span>
              <select id="categoria" v-model="categoria">
                <option value="">Selecione</option>
                <option value="Infraestrutura">Infraestrutura</option>
                <option value="Limpeza">Limpeza</option>
                <option value="Seguranca">Seguranca</option>
              </select>
            </label>
            <label class="field" for="status">
              <span>Status atual</span>
              <select id="status" v-model="status">
                <option value="Pendente">Pendente</option>
                <option value="Em andamento">Em andamento</option>
                <option value="Concluida">Concluida</option>
              </select>
            </label>
            <label class="field" for="data">
              <span>Data da solicitacao</span>
              <input id="data" v-model="data" type="date" />
            </label>
          </div>
        </div>

        <div class="form-section">
          <header class="form-section__header">
            <h2 class="form-section__title">Descricao detalhada</h2>
            <p class="form-section__hint">Explique a demanda e contextualize o pedido.</p>
          </header>
          <label class="field field--full" for="descricao">
            <span>Descricao</span>
            <textarea
              id="descricao"
              v-model="descricao"
              placeholder="Resuma o problema, historico e expectativas de entrega"
              required
            ></textarea>
          </label>
        </div>

        <div class="form-section">
          <header class="form-section__header">
            <h2 class="form-section__title">Responsaveis & localizacao</h2>
            <p class="form-section__hint">Esses dados ajudam a equipe de campo a agir rapidamente.</p>
          </header>
          <div class="field-grid">
            <label class="field" for="solicitante">
              <span>Nome do solicitante</span>
              <input id="solicitante" v-model="solicitante" type="text" placeholder="Quem solicitou a tarefa?" />
            </label>
            <label class="field" for="contato">
              <span>Contato</span>
              <input id="contato" v-model="contato" type="text" placeholder="E-mail ou telefone" />
            </label>
            <label class="field field--full" for="endereco">
              <span>Endereco</span>
              <input id="endereco" v-model="endereco" type="text" placeholder="Rua, numero, bairro e referencias relevantes" />
            </label>
          </div>
        </div>

        <div class="form-section">
          <header class="form-section__header">
            <h2 class="form-section__title">Anexos complementares</h2>
            <p class="form-section__hint">Faca upload de fotos, laudos ou planilhas que possam ajudar na execucao.</p>
          </header>
          <div class="upload-zone">
            <label class="upload-zone__label" for="anexo">
              <span class="upload-zone__icon">⬆</span>
              <span class="upload-zone__text">Arraste e solte arquivos aqui ou clique para selecionar</span>
              <small>Formatos comuns (PDF, JPG, PNG, DOC) ate 10&nbsp;MB por arquivo.</small>
            </label>
            <input id="anexo" ref="anexoInput" class="upload-zone__input" type="file" multiple />
          </div>
          <ul v-if="anexosSelecionados.length" class="file-list">
            <li v-for="arquivo in anexosSelecionados" :key="arquivo.name" class="file-item">
              <span class="file-item__name">{{ arquivo.name }}</span>
              <span class="file-item__size">{{ (arquivo.size / 1024).toFixed(0) }} KB</span>
            </li>
          </ul>
        </div>

        <footer class="form-footer">
          <button type="button" class="btn btn-secondary" @click="voltar">Cancelar</button>
          <button type="submit" class="btn btn-primary">Salvar tarefa</button>
        </footer>
      </form>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
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

const anexosSelecionados = computed(() => Array.from(anexoInput.value?.files || []));

const limparFormulario = () => {
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
};

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
  router.back();
}
</script>

<style scoped>
.create-page {
  min-height: calc(100vh - 96px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(32px, 8vw, 72px) clamp(16px, 6vw, 48px);
  background: radial-gradient(circle at top left, rgba(21, 101, 192, 0.12), transparent 55%),
    radial-gradient(circle at bottom right, rgba(67, 160, 71, 0.1), transparent 50%), #f5f8ff;
}

.create-card {
  width: min(1120px, 100%);
  display: grid;
  grid-template-columns: minmax(260px, 320px) minmax(0, 1fr);
  border-radius: 32px;
  box-shadow: 0 32px 80px rgba(15, 35, 75, 0.15);
  background: #ffffff;
  overflow: hidden;
}

.create-card__info {
  background: linear-gradient(160deg, #174378 0%, #1b65c0 60%, #59a1ff 100%);
  color: #ffffff;
  padding: clamp(32px, 6vw, 56px);
  display: flex;
  flex-direction: column;
  gap: clamp(18px, 4vw, 28px);
  position: relative;
  isolation: isolate;
}

.create-card__info::after {
  content: "";
  position: absolute;
  inset: clamp(18px, 4vw, 40px);
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 22px;
  opacity: 0.6;
  pointer-events: none;
}

.create-card__info > * {
  position: relative;
  z-index: 1;
}

.create-card__badge {
  align-self: flex-start;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.25);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.4px;
  text-transform: uppercase;
}

.create-card__info h1 {
  font-size: clamp(1.8rem, 3vw, 2.2rem);
  margin: 0;
}

.create-card__info p {
  margin: 0;
  color: rgba(255, 255, 255, 0.88);
  line-height: 1.6;
}

.info-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 12px;
}

.info-list li {
  display: grid;
  grid-template-columns: 20px 1fr;
  align-items: start;
  gap: 12px;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.85);
}

.info-list li::before {
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ffde7d;
  margin-top: 8px;
}

.create-form {
  padding: clamp(32px, 6vw, 56px);
  display: flex;
  flex-direction: column;
  gap: clamp(24px, 4vw, 32px);
}

.form-section {
  background: #f8faff;
  border-radius: 24px;
  padding: clamp(20px, 4vw, 28px);
  border: 1px solid rgba(21, 101, 192, 0.08);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6);
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-section__header {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-section__title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #14365e;
  margin: 0;
}

.form-section__hint {
  font-size: 0.9rem;
  color: #4b5877;
  margin: 0;
}

.field-grid {
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field span {
  font-size: 0.88rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: #274064;
}

.field--full {
  grid-column: 1 / -1;
}

input,
select,
textarea {
  border: 1px solid rgba(20, 54, 94, 0.18);
  border-radius: 14px;
  padding: 14px 16px;
  font-size: 1rem;
  color: #1a2a42;
  background: #ffffff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

input::placeholder,
textarea::placeholder {
  color: rgba(26, 42, 66, 0.45);
}

textarea {
  min-height: 150px;
  resize: vertical;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #1b65c0;
  box-shadow: 0 0 0 4px rgba(27, 101, 192, 0.12);
}

select {
  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, #1b65c0 50%),
    linear-gradient(135deg, #1b65c0 50%, transparent 50%);
  background-position: calc(100% - 20px) calc(50% - 4px), calc(100% - 14px) calc(50% - 4px);
  background-size: 7px 7px, 7px 7px;
  background-repeat: no-repeat;
}

.upload-zone {
  position: relative;
  border: 1px dashed rgba(27, 101, 192, 0.35);
  background: rgba(27, 101, 192, 0.04);
  border-radius: 22px;
  padding: clamp(22px, 4vw, 32px);
  text-align: center;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.upload-zone:hover {
  border-color: rgba(27, 101, 192, 0.55);
  background: rgba(27, 101, 192, 0.08);
}

.upload-zone__label {
  display: grid;
  gap: 10px;
  justify-items: center;
  cursor: pointer;
  color: #1a2a42;
  font-weight: 500;
}

.upload-zone__icon {
  font-size: 1.8rem;
}

.upload-zone__text {
  font-size: 0.95rem;
}

.upload-zone__label small {
  font-size: 0.8rem;
  color: #4b5877;
}

.upload-zone__input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}

.file-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 10px;
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-radius: 14px;
  background: rgba(27, 101, 192, 0.05);
  color: #1a2a42;
  font-size: 0.92rem;
}

.file-item__name {
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}

.file-item__size {
  color: #4b5877;
  font-size: 0.85rem;
  margin-left: 12px;
}

.form-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  flex-wrap: wrap;
  padding-top: 4px;
}

.btn {
  border: none;
  border-radius: 999px;
  padding: 13px 28px;
  font-size: 0.98rem;
  font-weight: 600;
  letter-spacing: 0.3px;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 4px rgba(27, 101, 192, 0.18);
}

.btn:active {
  transform: translateY(1px);
}

.btn-primary {
  background: linear-gradient(135deg, #2eb872 0%, #43a047 100%);
  color: #ffffff;
  box-shadow: 0 16px 32px rgba(46, 184, 114, 0.28);
}

.btn-primary:hover {
  background: linear-gradient(135deg, #27a865 0%, #3c9440 100%);
}

.btn-secondary {
  background: rgba(21, 101, 192, 0.12);
  color: #1b3f6a;
}

.btn-secondary:hover {
  background: rgba(21, 101, 192, 0.18);
}

@media (max-width: 960px) {
  .create-card {
    grid-template-columns: 1fr;
  }

  .create-card__info {
    order: 1;
  }

  .create-form {
    order: 2;
  }
}

@media (max-width: 560px) {
  .create-card__info::after {
    inset: 24px;
  }

  .create-card__badge {
    font-size: 0.75rem;
  }

  .form-footer {
    flex-direction: column;
    align-items: stretch;
  }

  .btn {
    width: 100%;
  }
}
</style>
