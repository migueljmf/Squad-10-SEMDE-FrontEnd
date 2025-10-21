<template>
  <section class="detalhe-page">
    <div v-if="demanda" class="detalhe-card">
      <header class="detalhe-header">
        <div class="header-texts">
          <h1>{{ tituloCabecalho }}</h1>
          <p>{{ demanda.titulo }}</p>
        </div>
        <span class="status-tag" :class="['status-' + demanda.statusClass]">
          {{ demanda.status }}
        </span>
      </header>

      <div class="detalhe-body">
        <!-- Section: Dados da Tarefa -->
        <div class="detalhe-section">
          <h2>Dados da Tarefa</h2>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Tipo</span>
              <span class="info-value">{{ demanda.tipo }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Categoria</span>
              <span class="info-value">{{ demanda.categoria }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Prioridade</span>
              <span class="info-value">{{ demanda.priority || demanda.prioridade || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Equipe</span>
              <span class="info-value">{{ demanda.team || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Data</span>
              <span class="info-value">{{ demanda.dataFormatada }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Status</span>
              <span class="info-value">{{ demanda.status }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Categorias</span>
              <span class="info-value">{{ demanda.categoriasTexto || '-' }}</span>
            </div>
          </div>
          <div class="info-item" style="margin-top:16px;">
            <span class="info-label">Descrição</span>
            <p class="info-value">{{ demanda.descricao || 'Sem descricao adicional.' }}</p>
          </div>
        </div>

        <!-- Section: Dados do Contato -->
        <div class="detalhe-section">
          <h2>Dados do Contato</h2>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Nome</span>
              <span class="info-value">{{ demanda.contato || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Email</span>
              <span class="info-value">{{ demanda.contatoEmail || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Telefone</span>
              <span class="info-value">{{ demanda.contatoTelefone || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Data de nascimento</span>
              <span class="info-value">{{ demanda.contatoDataNascimento || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Formação</span>
              <span class="info-value">{{ demanda.contatoFormacao || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- Section: Endereço -->
        <div class="detalhe-section">
          <h2>Endereço</h2>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Rua</span>
              <span class="info-value">{{ demanda.enderecoRua || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Bairro</span>
              <span class="info-value">{{ demanda.enderecoBairro || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Número</span>
              <span class="info-value">{{ demanda.enderecoNumero || '-' }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="detalhe-actions">
        <button type="button" class="btn voltar" @click="voltar">Voltar</button>
      </div>
    </div>

    <div v-else class="detalhe-card detalhe-vazio">
      <h1>Demanda nao encontrada</h1>
      <p>A demanda solicitada pode ter sido removida ou ainda nao foi cadastrada.</p>
      <button type="button" class="btn voltar" @click="voltar">Voltar para Gestao de Demandas</button>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import mdicon from "mdi-vue/v3";
import { useDemandasStore } from "../stores/useDemandasStore";
import { demandasApi } from "../services/demandasApi";

const route = useRoute();
const router = useRouter();
const store = useDemandasStore();

const apiDemanda = ref(null)

const demanda = computed(() => {
  // Prefer API-fetched detail when available
  const fromApi = apiDemanda.value
  if (fromApi) {
    const registro = fromApi
    return {
      id: registro.id,
      titulo: registro.title || registro.titulo,
      descricao: registro.description || registro.descricao,
      data: registro.date ? new Date(registro.date).toISOString().split('T')[0] : registro.data,
      dataFormatada: formatarData(registro.date || registro.data),
      status: mapStatus(registro.status) || registro.status,
      statusClass: mapStatus(registro.status)?.toLowerCase() || registro.statusSlug || 'pendente',
      tipo: 'Tarefa',
      categoria: registro.categories?.[0]?.name || registro.categoria || 'Tarefa',
      solicitante: registro.advisor?.userId || registro.solicitante || 'Nao informado',
      contato: registro.contact?.name || registro.contato || 'Nao informado',
      contatoEmail: registro.contact?.email || null,
      contatoTelefone: registro.contact?.phone || null,
      contatoDataNascimento: registro.contact?.dateOfBirth ? new Date(registro.contact.dateOfBirth).toLocaleDateString('pt-BR') : null,
      contatoFormacao: registro.contact?.education || null,
      local: registro.contact?.address ? formatarEnderecoResumo(registro.contact.address) : registro.local || 'Nao informado',
      enderecoCompleto: registro.contact?.address ? `${registro.contact.address.street || ''}${registro.contact.address.number ? ', ' + registro.contact.address.number : ''}${registro.contact.address.district ? ' - ' + registro.contact.address.district : ''}` : null,
      enderecoRua: registro.contact?.address?.street || null,
      enderecoBairro: registro.contact?.address?.district || null,
      enderecoNumero: registro.contact?.address?.number || null,
      localFull: registro.contact?.address ? `${registro.contact.address.street || ''}${registro.contact.address.number ? ', ' + registro.contact.address.number : ''}${registro.contact.address.district ? ', ' + registro.contact.address.district : ''}` : (registro.local || null),
      priority: registro.priority || null,
      team: registro.advisor.team || null,
      advisorId: registro.advisorId || registro.advisor?.id || null,
      categoriasTexto: registro.categories ? registro.categories.map((c) => c.name).join(', ') : null,
      anexos: registro.attachments || registro.anexos || [],
    }
  }

  const registroStore = store.getById(route.params.id)
  if (!registroStore) return null
  return {
    ...registroStore,
    statusClass: registroStore.statusSlug || 'pendente',
    dataFormatada: formatarData(registroStore.data),
    categoria: registroStore.categoria || registroStore.tipo,
  }
})

function mapStatus(apiStatus) {
  const statusMap = {
    PENDENTE: 'Pendente',
    EM_ANDAMENTO: 'Em andamento',
    CONCLUIDA: 'Concluida',
    CANCELADA: 'Cancelada'
  }
  return statusMap[apiStatus] || apiStatus
}

function formatarEnderecoResumo(address) {
  if (!address) return 'Nao informado'
  const parts = [address.street, address.number, address.district, address.city].filter(Boolean)
  return parts.join(', ')
}

const anexos = computed(() => demanda.value?.anexos || []);

const tituloCabecalho = computed(() => {
  const registro = demanda.value;
  if (!registro) return "Detalhe da Tarefa";
  const tipo = (registro.tipo || "").toLowerCase();
  if (registro.tipoSlug === "acao" || tipo === "acao") {
    return "Detalhe da Acao";
  }
  return "Detalhe da Tarefa";
});

function voltar() {
  router.push("/gestao-demandas");
}

onMounted(async () => {
  const id = route.params.id
  if (!id) return
  try {
    const response = await demandasApi.getById(id)
    // response may be { message, data: {...} } or the object directly
    apiDemanda.value = response?.data || response
  } catch (err) {
    // fallback: store value is already used by computed
    console.warn('Nao foi possivel buscar detalhe via API, usando dados locais se existirem', err)
  }
})

function formatarData(valor) {
  if (!valor) return "Data nao informada";
  const data = new Date(`${valor}T00:00:00`);
  if (Number.isNaN(data.getTime())) {
    const alternativa = new Date(valor);
    return Number.isNaN(alternativa.getTime()) ? valor : alternativa.toLocaleDateString("pt-BR");
  }
  return data.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function formatarTamanho(bytes) {
  if (!bytes) return "";
  const unidades = ["B", "KB", "MB", "GB"];
  let tamanho = bytes;
  let indice = 0;
  while (tamanho >= 1024 && indice < unidades.length - 1) {
    tamanho /= 1024;
    indice += 1;
  }
  return `${tamanho.toFixed(indice === 0 ? 0 : 1)} ${unidades[indice]}`;
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");

.detalhe-page {
  min-height: calc(100vh - 96px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(120px, 18vh, 180px) 16px 80px;
  background: linear-gradient(135deg, #f0f4ff 0%, #f8fbff 100%);
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.detalhe-card {
  width: min(840px, 100%);
  background: #ffffff;
  border-radius: 28px;
  box-shadow: 0 24px 48px rgba(21, 101, 192, 0.16);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.detalhe-header {
  padding: 40px 40px 32px;
  background: linear-gradient(135deg, #1565c0 0%, #163b66 100%);
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: flex-start;
}

.detalhe-header h1 {
  margin: 0 0 12px;
  font-size: 32px;
  font-weight: 600;
}

.detalhe-header p {
  margin: 0;
  font-size: 16px;
  opacity: 0.85;
}

.status-tag {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  padding: 12px 24px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  align-self: flex-start;
}

.status-tag.status-em-andamento,
.status-tag.status-andamento {
  background: rgba(144, 202, 249, 0.35);
  color: #e3f2fd;
}

.status-tag.status-concluida,
.status-tag.status-concluido {
  background: rgba(200, 230, 201, 0.35);
  color: #e8f5e9;
}

.detalhe-body {
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  color: #263238;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px 24px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: #f7f9ff;
  border-radius: 16px;
  padding: 16px 20px;
}

.info-label {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: #4f5b6b;
}

.info-value {
  text-align: justify;
  font-size: 17px;
  font-weight: 500;
  color: #18263a;
}

.detalhe-section h2 {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 600;
  color: #14263c;
}

.detalhe-section p {
  margin: 0;
  font-size: 16px;
  line-height: 1.6;
  color: #46505f;
}

.anexos-list {
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
  font-weight: 500;
}

.anexo-tamanho {
  color: #6d7685;
}

.anexos-empty {
  margin: 0;
  font-size: 15px;
  color: #6d7685;
}

.detalhe-actions {
  padding: 0 40px 40px;
  display: flex;
  justify-content: flex-end;
}

.btn {
  border: none;
  border-radius: 12px;
  padding: 12px 28px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn.voltar {
  background: #1565c0;
  color: #ffffff;
  box-shadow: 0 12px 24px rgba(21, 101, 192, 0.24);
}

.btn.voltar:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 28px rgba(21, 101, 192, 0.3);
}

.detalhe-vazio {
  align-items: center;
  text-align: center;
  gap: 16px;
  padding: 64px 32px;
}

.detalhe-vazio h1 {
  margin: 0;
  font-size: 28px;
  color: #12345b;
}

.detalhe-vazio p {
  margin: 0;
  font-size: 16px;
  color: #5a6274;
}

@media (max-width: 640px) {
  .detalhe-header {
    flex-direction: column;
    padding: 32px 28px;
  }

  .detalhe-body {
    padding: 36px 28px;
  }

  .detalhe-actions {
    padding: 0 28px 28px;
  }
}

@media (max-width: 440px) {
  .detalhe-header h1 {
    font-size: 26px;
  }

  .info-item {
    padding: 14px 16px;
  }

  .btn {
    width: 100%;
    text-align: center;
  }
}
</style>