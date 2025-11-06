<template>
  <div class="page">
    <form class="card" @submit.prevent="salvarAlteracoes">
      <header class="card__header">
        <div>
          <h1>Editar tarefa</h1>
          <p>Atualize os detalhes essenciais da tarefa.</p>
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
            <option value="ENSINO_FUNDAMENTAL">Ensino fundamental</option>
            <option value="ENSINO_MEDIO">Ensino médio</option>
            <option value="SUPERIOR_INCOMPLETO">Superior incompleto</option>
            <option value="SUPERIOR_COMPLETO">Superior completo</option>
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

      <div class="detalhe-actions">
        <button type="button" class="btn voltar" @click="voltar">Voltar</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import EnderecoForm from '@/components/EnderecoForm.vue'
import { criarEnderecoVazio } from '@/utils/endereco'
import { categoriesApi } from '@/services/categoriesApi'
import { addressApi } from '@/services/addressApi'
import { contactsApi } from '@/services/contactsApi'
import { demandasApi } from '@/services/demandasApi'
import { useDemandasStore } from '@/stores/useDemandasStore'
import { citiesApi } from '@/services/citiesApi'

const route = useRoute()
const router = useRouter()
const store = useDemandasStore()

// tarefa
const titulo = ref('')
const descricao = ref('')
const data = ref('')
const priority = ref('ALTA')
const categoria = ref('')

// contato
const contactName = ref('')
const contactEmail = ref('')
const contactPhone = ref('')
const contactDateOfBirth = ref('')
const contactEducation = ref('')
const contactId = ref(null)

// endereco
const enderecoObj = ref(criarEnderecoVazio())
const categorias = ref([])

function mapAddressToForm(addrObj) {
  if (!addrObj) return criarEnderecoVazio()
  return {
    logradouro: addrObj.street || '',
    numero: addrObj.number || '',
    complemento: addrObj.complement || '',
    bairro: addrObj.district || '',
    cidadeId: addrObj.cityId || '',
    uf: addrObj.uf || "",
    latitude: addrObj.latitude || null,
    longitude: addrObj.longitude || null,
  }
}

function mapFormAddress(address){
  if (!address) return criarEnderecoVazio()
  return {
    street: address.logradouro || '',
    number: address.numero || '',
    district: address.bairro || '',
    cityId: address.cidadeId || '',
    latitude: address.latitude || null,
    longitude: address.longitude || null,
  }
}


onMounted(async () => {
  try {
    categorias.value = await categoriesApi.getAll()
  } catch (e) {
    console.error('Erro ao carregar categorias', e)
  }

  // carregar dados da tarefa
  const id = route.params.id
  if (!id) return
  try {
    const resp = await demandasApi.getById(id)
    const registro = resp?.data || resp || null
    if (!registro) return

    titulo.value = registro.title || registro.titulo || ''
    descricao.value = registro.description || registro.descricao || ''
    data.value = registro.date ? registro.date.split('T')[0] : ''
    priority.value = registro.priority || 'ALTA'
    categoria.value = registro.categories?.[0]?.id || ''

    contactName.value = registro.contact?.name || ''
    contactEmail.value = registro.contact?.email || ''
    contactPhone.value = registro.contact?.phone || ''
    contactDateOfBirth.value = registro.contact?.dateOfBirth ? registro.contact.dateOfBirth.split('T')[0] : ''
    contactEducation.value = registro.contact?.education || ''
    contactId.value = registro.contact?.id || null
    // Try several possible locations for address in the API response
    let addrObj = registro.contact?.address || registro.address || (Array.isArray(registro.addresses) && registro.addresses[0]) || null
    const possibleAddrId = registro.contact?.address?.id || registro.contact?.addressId || registro.addressId || (Array.isArray(registro.addresses) && registro.addresses[0]?.id) || null

    // If we don't have an object but have an id, try fetching it
    if (!addrObj && possibleAddrId) {
      try {
        const fetched = await addressApi.getById(possibleAddrId)
        addrObj = fetched || null
      } catch (e) {
        console.warn('Nao foi possivel buscar endereco por id:', possibleAddrId, e)
      }
    }

    if (addrObj) {
      // map common backend address keys to the form shape

    
    const resolvedCityId = addrObj.cityId
    let city = ''
      try {
        city = await citiesApi.getById(resolvedCityId);
        console.log('Resolved city:', city);
        
      } catch (err) {
        console.warn('Nao foi possivel encontrar a cidade:', err)
      }
      const mapped = {
        logradouro: addrObj.street || '',
        numero: addrObj.number ||'',
        complemento: addrObj.complemento || addrObj.complement || '',
        bairro: addrObj.district || '',
        cidade: city.name || '',
        cidadeId:addrObj.cityId || '',
        uf: addrObj.uf || "",
        latitude: addrObj.latitude || null,
        longitude: addrObj.longitude ||null,
      }
      enderecoObj.value = { ...criarEnderecoVazio(), ...mapped }
      enderecoObj.value.addressId = addrObj.id || addrObj.addressId || possibleAddrId || null
    }
  } catch (err) {
    console.warn('Nao foi possivel carregar detalhe via API', err)
    // fallback: tentar popular via store
    const local = store.getById(route.params.id)
    if (local) {
      titulo.value = local.titulo || ''
      descricao.value = local.descricao || ''
      data.value = local.data || ''
      categoria.value = local.categoria || ''
      enderecoObj.value = { ...criarEnderecoVazio(), ...(local.enderecoDetalhado || {}) }
    }
  }
})

async function salvarAlteracoes() {
  const id = route.params.id
  if (!id) return
  
  try {
    // 1) endereco: update or create (capture response and map back to form)
    let addressId = enderecoObj.value.addressId || enderecoObj.value.id || null
    let addressResult = null
    console.log('Salvando endereco:', mapFormAddress(enderecoObj.value))
    if (addressId) {
      addressResult = await addressApi.update(addressId,mapFormAddress(enderecoObj.value))
      // if API returned updated address, map to form
      if (addressResult) {
        enderecoObj.value = { ...criarEnderecoVazio(), ...mapAddressToForm(addressResult) }
        enderecoObj.value.addressId = addressResult.id || addressResult.addressId || addressId
      }
    } else {
      const created = await addressApi.create(enderecoObj.value)
      addressResult = created
      addressId = created.id || created.addressId || addressId
      if (created) {
        enderecoObj.value = { ...criarEnderecoVazio(), ...mapAddressToForm(created) }
        enderecoObj.value.addressId = addressId
      }
    }

    // 2) contato: update or create minimal
    let cid = contactId.value || null
    if (cid) {
      await contactsApi.update(cid, { name: contactName.value, email: contactEmail.value, phone: contactPhone.value })
    } else {
      const createdContact = await contactsApi.create({ name: contactName.value, email: contactEmail.value, phone: contactPhone.value, addressId })
      cid = createdContact.id || createdContact.contactId || cid
    }

    // 3) task update
    const payload = {
      title: titulo.value,
      description: descricao.value,
      date: data.value ? new Date(data.value).toISOString() : null,
      priority: priority.value,
      contactId: cid,
      categoryIds: categoria.value ? [categoria.value] : [],
    }
    await demandasApi.update(id, payload)
    // re-fetch latest task to ensure we have normalized data and to populate address correctly
    try {
      const latest = await demandasApi.getById(id)
      const reg = latest?.data || latest || null
      if (reg) {
        // if backend returned address nested differently, reuse mapping logic
        const latestAddr = reg.contact?.address || reg.address || (Array.isArray(reg.addresses) && reg.addresses[0]) || null
        if (latestAddr) {
          enderecoObj.value = { ...criarEnderecoVazio(), ...mapAddressToForm(latestAddr) }
          enderecoObj.value.addressId = latestAddr.id || latestAddr.addressId || addressId || null
        }
      }
    } catch (e) {
      // ignore fetch error, not critical
      console.warn('Nao foi possivel re-buscar tarefa apos update', e)
    }

    // update local store mirror
    await store.updateDemanda(id, {
      titulo: titulo.value,
      descricao: descricao.value,
      contato: contactName.value,
      endereco: enderecoObj.value,
      enderecoResumo: enderecoObj.value.logradouro || '',
      categoria: categoria.value,
      data: data.value,
      status: null,
      anexos: [],
    })

    router.push('/gestao-demandas')
  } catch (err) {
    console.error('Erro ao salvar alteracoes', err)
    alert('Erro ao salvar alteracoes. Veja o console para mais detalhes.')
  }
}

function voltar() {
  router.push('/gestao-demandas')
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");

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
}

.grid.two {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 36px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 14px;
  color: #475569;
}

.field input,
.field textarea,
.field select {
  padding: 12px 14px;
  width: calc(100%-28px);
  height: 20px;
  border-radius: 12px;
  border: 1px solid rgba(148, 163, 184, 0.35);
  background: #f8fafc;
  font-size: 14px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}
.field select { height: 46px }

.field textarea {
  resize: vertical;
  min-height: 160px;
}

.field input:focus,
.field textarea:focus,
.field select:focus {
  border-color: #2563eb;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.16);
  outline: none;
}

.btn { border: none; border-radius: 999px; padding: 12px 24px; font-size: 14px; font-weight: 600; cursor: pointer }
.btn.primary { background: linear-gradient(135deg, #2563eb, #1d4ed8); color:#fff }
.btn.ghost { background: transparent; color:#1d4ed8; border:1px solid #1d4ed8 }

@media (max-width: 720px) {
  .card { padding: 28px }
  .grid.two { grid-template-columns: 1fr; gap: 24px }
}
</style>


