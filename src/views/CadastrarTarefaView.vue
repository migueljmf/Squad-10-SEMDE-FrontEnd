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

      <!-- TAREFA -->
      <section class="group">
        <h2>Tarefa</h2>
        <div class="grid two">
          <label class="field">
            <span>Título *</span>
            <input v-model="titulo" type="text" placeholder="Informe o título" required />
          </label>
          <label class="field">
            <span>Categoria</span>
            <select v-model="categoria">
              <option value="">Selecione</option>
              <option v-for="cat in categorias" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
            </select>
          </label>
        </div>

        <label class="field">
          <span>Descrição *</span>
          <textarea v-model="descricao" rows="4" placeholder="Descreva o que precisa ser resolvido" required></textarea>
        </label>

        <div class="grid two">
          <label class="field">
            <span>Data prevista</span>
            <input v-model="data" type="date" />
          </label>
          <label class="field">
            <span>Prioridade</span>
            <select v-model="priority">
              <option value="ALTA">Alta</option>
              <option value="MEDIA">Média</option>
              <option value="BAIXA">Baixa</option>
            </select>
          </label>
        </div>
      </section>

      <!-- CONTATO -->
      <section class="group">
        <h2>Contato</h2>
        <div class="grid two">
          <label class="field">
            <span>Nome *</span>
            <input v-model="contactName" type="text" placeholder="Nome do contato" required />
          </label>
          <label class="field">
            <span>Email</span>
            <input v-model="contactEmail" type="email" placeholder="contato@exemplo.com" />
          </label>
        </div>

        <EnderecoForm v-model="endereco" class="address-block" />

        <div class="grid two">
          <label class="field">
            <span>Telefone</span>
            <input v-model="contactPhone" type="text" placeholder="+55 79 99876-5432" />
          </label>
          <label class="field">
            <span>Data de nascimento</span>
            <input v-model="contactDateOfBirth" type="date" />
          </label>
        </div>

        <label class="field">
          <span>Formação</span>
          <select v-model="contactEducation">
            <option value="">Selecione</option>
            <option value="FUNDAMENTAL_INCOMPLETO">Fundamental incompleto</option>
            <option value="FUNDAMENTAL_COMPLETO">Fundamental completo</option>
            <option value="MEDIO_INCOMPLETO">Médio incompleto</option>
            <option value="MEDIO_COMPLETO">Médio completo</option>
            <option value="SUPERIOR_INCOMPLETO">Superior incompleto</option>
            <option value="SUPERIOR_COMPLETO">Superior completo</option>
            <option value="POS_GRADUACAO">Pós-graduação</option>
            <option value="MESTRADO">Mestrado</option>
            <option value="DOUTORADO">Doutorado</option>
          </select>

        </label>
      </section>

      <!-- ENDEREÇO -->
      <section class="group">
        <h2>Endereço</h2>
        <label class="field" style="width:100%">
          <EnderecoForm v-model="enderecoObj" />
        </label>
      </section>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import EnderecoForm from "../components/EnderecoForm.vue";
import { criarEnderecoVazio, formatarEnderecoCurto } from "../utils/endereco";
import { useDemandasStore } from "../stores/useDemandasStore";
import EnderecoForm from "@/components/EnderecoForm.vue";
import { categoriesApi } from "../services/categoriesApi";
import { addressApi } from "../services/addressApi";
import { citiesApi } from "../services/citiesApi";
import { contactsApi } from "../services/contactsApi";
import { demandasApi } from "../services/demandasApi";

const router = useRouter();
const store = useDemandasStore();

// tarefa
const titulo = ref("");
const descricao = ref("");
const data = ref("");
const priority = ref("ALTA");
const categoria = ref("");

// contato
const contactName = ref("");
const contactEmail = ref("");
const contactPhone = ref("");
const contactDateOfBirth = ref("");
const contactEducation = ref("");

// endereco
const enderecoObj = ref({});

const categorias = ref([])

function limparFormulario() {
  titulo.value = "";
  descricao.value = "";
  data.value = "";
  priority.value = "ALTA";
  categoria.value = "";

  contactName.value = "";
  contactEmail.value = "";
  contactPhone.value = "";
  contactDateOfBirth.value = "";
  contactEducation.value = "";

  enderecoObj.value = {};
}

async function salvarTarefa() {
  // checar token
  const token = localStorage.getItem('token')
  if (!token) return router.push('/login')

  try {

    //0) resolver cityId: preferir cityId já selecionado no formulário, senão buscar apenas o id pelo nome
    let resolvedCityId = enderecoObj.value.cityId || null
    if (!resolvedCityId && enderecoObj.value.cidade) {
      try {
        const cities = await citiesApi.search(enderecoObj.value.cidade)
        if (Array.isArray(cities) && cities.length) {
          const first = cities[0]
          resolvedCityId = first.id || first.cityId || first.value || null
        } else if (cities && (cities.id || cities.cityId)) {
          resolvedCityId = cities.id || cities.cityId
        }
      } catch (err) {
        console.warn('Nao foi possivel resolver cityId a partir do nome:', err)
      }
    }

    // 1) criar endereco
    const addressPayload = {
      street: enderecoObj.value.logradouro,
      district: enderecoObj.value.bairro,
      cityId: resolvedCityId,
      number: enderecoObj.value.numero,
      latitude: enderecoObj.value.latitude,
      longitude: enderecoObj.value.longitude,
    }
    const addressRes = await addressApi.create(addressPayload)
    const addressId = addressRes.id || addressRes.addressId || addressRes

    // 2) criar contato
    const contactPayload = {
      name: contactName.value,
      email: contactEmail.value || undefined,
      phone: contactPhone.value || undefined,
      dateOfBirth: contactDateOfBirth.value || null,
      education: contactEducation.value || null,
      addressId,
    }
    const contactRes = await contactsApi.create(contactPayload)
    const contactId = contactRes.id || contactRes.contactId || contactRes

    // 3) criar task
    const taskPayload = {
      title: titulo.value,
      description: descricao.value,
      date: data.value ? new Date(data.value).toISOString() : null,
      priority: priority.value,
      contactId,
      categoryIds: categoria.value ? [categoria.value] : [],
    }
    await demandasApi.create(taskPayload)

    limparFormulario()
    router.push('/gestao-demandas')
  } catch (e) {
    console.error('Erro ao salvar tarefa', e)
    alert('Erro ao salvar tarefa. Veja o console para detalhes.')
  }
}

function voltar() {
  router.push('/gestao-demandas')
}

onMounted(async () => {
  try {
    categorias.value = await categoriesApi.getAll()
  } catch (e) {
    console.error('Erro ao carregar categorias', e)
  }
})
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
  gap: 40px;
  /* mais respiro entre blocos */
}

.grid.two {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 36px;
  /* mais espaço entre colunas */
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 14px;
  color: #475569;
}

.field--shrink {
  max-width: 330px;
}

.field input,
.field textarea,
.field select {
  padding: 12px 14px;
  /* inputs mais confortáveis */
  width: calc(100%-28px);
  height: 20px;
  border-radius: 12px;
  border: 1px solid rgba(148, 163, 184, 0.35);
  background: #f8fafc;
  font-size: 14px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.field select {
  height: 46px;
}

.field textarea {
  resize: vertical;
  min-height: 160px;
  /* textarea mais alto */
}

.field input:focus,
.field textarea:focus,
.field select:focus {
  border-color: #2563eb;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.16);
  outline: none;
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
    gap: 24px;
  }

  .field--shrink {
    max-width: none;
  }
}
</style>
