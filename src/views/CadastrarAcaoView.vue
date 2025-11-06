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

        <EnderecoForm v-model="endereco" class="address-block" />

        <div class="grid two">
          <label class="field">
            <span>Data</span>
            <input v-model="data" type="date" />
          </label>
          <label class="field field--shrink">
            <span>Status</span>
            <select v-model="status">
              <option value="Pendente">Pendente</option>
              <option value="Em andamento">Em andamento</option>
              <option value="Concluida">Concluida</option>
            </select>
          </label>
        </div>
      </section>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import EnderecoForm from "../components/EnderecoForm.vue";
import { criarEnderecoVazio, formatarEnderecoCurto } from "../utils/endereco";
import { useDemandasStore } from "../stores/useDemandasStore";

const router = useRouter();
const store = useDemandasStore();

const titulo = ref("");
const descricao = ref("");
const solicitante = ref("");
const contato = ref("");
const endereco = ref(criarEnderecoVazio());
const data = ref("");
const status = ref("Pendente");
const salvando = ref(false);

async function salvarAcao() {
  if (salvando.value) return;
  salvando.value = true;

  try {
    const enderecoPayload = { ...endereco.value };
    const resumoEndereco = formatarEnderecoCurto(enderecoPayload);
  const descricaoLocal = resumoEndereco || enderecoPayload.logradouro || "Nao informado";
  const coordenadas = await buscarCoordenadas(descricaoLocal);

    store.addAcao({
      titulo: titulo.value,
      descricao: descricao.value,
      solicitante: solicitante.value,
      contato: contato.value,
      endereco: enderecoPayload,
      enderecoResumo: resumoEndereco,
      local: descricaoLocal,
      data: data.value,
      status: status.value,
      latitude: coordenadas?.lat ?? null,
      longitude: coordenadas?.lng ?? null,
    });

    limparFormulario();
    router.push("/gestao-demandas");
  } finally {
    salvando.value = false;
  }
}

async function buscarCoordenadas(descricao) {
  const consulta = descricao?.trim();
  if (!consulta) return null;

  try {
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.set("format", "json");
    url.searchParams.set("limit", "1");
    url.searchParams.set("q", consulta);

    const resposta = await fetch(url.toString(), {
      headers: { Accept: "application/json" },
    });

    if (!resposta.ok) return null;
    const resultado = await resposta.json();
    if (!Array.isArray(resultado) || resultado.length === 0) return null;

    const registro = resultado[0];
    const lat = Number.parseFloat(registro.lat);
    const lng = Number.parseFloat(registro.lon);

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;

    return { lat, lng };
  } catch (erro) {
    console.warn("Falha ao geocodificar endereco:", erro);
    return null;
  }
}

function limparFormulario() {
  titulo.value = "";
  descricao.value = "";
  solicitante.value = "";
  contato.value = "";
  endereco.value = criarEnderecoVazio();
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
  font-family: "Poppins", sans-serif;
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
  gap: 30px;
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
  gap: 34px;
}

.grid.two {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 13px;
  color: #475569;
}

.field--shrink {
  max-width: 330px;
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
  min-height: 140px;
}

.address-block {
  padding: 22px 2px;
  background: #f8fbff;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 22px;
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





