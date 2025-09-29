<template>
  <div class="page-wrapper">
    <div v-if="demanda" class="cadastro-container">
      <header class="cadastro-header">
        <h1>Editar demanda</h1>
        <p>Atualize as informacoes da tarefa ou acao selecionada.</p>
      </header>

      <form class="cadastro-form" @submit.prevent="salvarAlteracoes">
        <div class="form-group">
          <label for="titulo">Titulo</label>
          <input id="titulo" v-model="titulo" type="text" placeholder="Digite o titulo" required />
        </div>

        <div class="form-group">
          <label for="descricao">Descricao detalhada</label>
          <textarea id="descricao" v-model="descricao" placeholder="Descreva a solicitacao" required></textarea>
        </div>

        <div class="form-group">
          <label for="solicitante">Solicitante</label>
          <input id="solicitante" v-model="solicitante" type="text" placeholder="Quem solicitou?" />
        </div>

        <div class="form-group">
          <label for="contato">Contato</label>
          <input id="contato" v-model="contato" type="text" placeholder="Email ou telefone" />
        </div>

        <div class="form-grid">
          <div class="form-group">
            <label for="endereco">Endereco / Local</label>
            <input id="endereco" v-model="endereco" type="text" placeholder="Onde sera executada?" />
          </div>

          <div class="form-group">
            <label for="categoria">Categoria</label>
            <input id="categoria" v-model="categoria" type="text" placeholder="Informe a categoria" />
          </div>
        </div>

        <div class="form-grid">
          <div class="form-group">
            <label for="data">Data</label>
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
          <label>Anexos atuais</label>
          <ul v-if="anexosExistentes.length" class="anexos-lista">
            <li v-for="(arquivo, index) in anexosExistentes" :key="`${arquivo.nome}-${index}`" class="anexo-item">
              <mdicon name="paperclip" :size="18" />
              <span class="anexo-nome">{{ arquivo.nome }}</span>
              <button type="button" class="anexo-remover" @click="removerAnexoExistente(index)">
                Remover
              </button>
            </li>
          </ul>
          <p v-else class="anexos-vazio">Nenhum anexo cadastrado.</p>
        </div>

        <div class="form-group">
          <label for="anexo">Adicionar novos anexos</label>
          <input id="anexo" ref="anexoInput" type="file" multiple />
        </div>

        <div class="form-actions">
          <button type="button" class="btn btn-secondary" @click="voltar">Cancelar</button>
          <button type="submit" class="btn btn-primary">Salvar alteracoes</button>
        </div>
      </form>
    </div>

    <div v-else class="cadastro-container vazio">
      <header class="cadastro-header">
        <h1>Demanda nao encontrada</h1>
        <p>O ID informado nao corresponde a uma demanda cadastrada.</p>
      </header>
      <div class="form-actions centro">
        <button type="button" class="btn btn-primary" @click="voltar">Voltar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import mdicon from "mdi-vue/v3";
import { useDemandasStore } from "../stores/useDemandasStore";

const route = useRoute();
const router = useRouter();
const store = useDemandasStore();

const demanda = computed(() => store.getById(route.params.id));

const titulo = ref("");
const descricao = ref("");
const solicitante = ref("");
const contato = ref("");
const endereco = ref("");
const categoria = ref("");
const data = ref("");
const status = ref("Pendente");
const anexosExistentes = ref([]);
const anexoInput = ref(null);

watch(
  demanda,
  (valor) => {
    if (!valor) return;
    titulo.value = valor.titulo || "";
    descricao.value = valor.descricao || "";
    solicitante.value = valor.solicitante || "";
    contato.value = valor.contato || "";
    endereco.value = valor.endereco || valor.local || "";
    categoria.value = valor.categoria || valor.tipo || "";
    data.value = valor.data || "";
    status.value = valor.status || "Pendente";
    anexosExistentes.value = (valor.anexos || []).map((arquivo) => ({ ...arquivo }));
  },
  { immediate: true }
);

function salvarAlteracoes() {
  if (!demanda.value) return;

  const novosAnexos = Array.from(anexoInput.value?.files || []).map((arquivo) => ({
    nome: arquivo.name,
    tamanho: arquivo.size,
    tipo: arquivo.type,
  }));

  const sucesso = store.updateDemanda(demanda.value.id, {
    titulo: titulo.value,
    descricao: descricao.value,
    solicitante: solicitante.value,
    contato: contato.value,
    endereco: endereco.value,
    local: endereco.value,
    categoria: categoria.value,
    data: data.value,
    status: status.value,
    anexos: [...anexosExistentes.value, ...novosAnexos],
  });

  if (!sucesso) {
    window.alert("Nao foi possivel atualizar a demanda.");
    return;
  }

  window.alert("Demanda atualizada com sucesso!");
  router.push({ name: "DetalheTarefa", params: { id: demanda.value.id } });
}

function removerAnexoExistente(index) {
  anexosExistentes.value.splice(index, 1);
}

function voltar() {
  router.back();
}
</script>

<style scoped>

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

.cadastro-container.vazio {
  align-items: center;
  text-align: center;
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

.anexos-lista {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.anexo-item {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f2f5ff;
  border-radius: 12px;
  padding: 12px 16px;
  color: #1f2a3c;
}

.anexo-nome {
  flex: 1;
  font-weight: 500;
}

.anexo-remover {
  border: none;
  background: transparent;
  color: #e53935;
  font-weight: 600;
  cursor: pointer;
}

.anexos-vazio {
  margin: 0;
  color: #6d7685;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 8px;
}

.form-actions.centro {
  justify-content: center;
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
  background: #1565c0;
  color: #fff;
  box-shadow: 0 12px 20px rgba(21, 101, 192, 0.24);
}

.btn-primary:hover {
  background: #0f4a92;
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
