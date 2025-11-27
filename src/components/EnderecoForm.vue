<template>
  <div class="endereco-form">
        <label class="field" style="position:relative">
      <span>Rua</span>
      <input class="autocomplete-input" v-model="queryLogradouro" @input="onQueryChange" type="text" placeholder="Rua" autocomplete="off" />
      <ul v-if="suggestions.length" class="suggestions address-suggestions">
        <li v-for="(s, idx) in suggestions" :key="idx" @click="selectSuggestion(s)">{{ s.displayText || s.label || s.raw.display_name }}</li>
      </ul>
    </label>
    <div class="grid">
      <label class="field">
        <span>Numero</span>
        <input v-model="form.numero" type="text" placeholder="Numero" />
      </label>
      <label class="field">
        <span>UF</span>
        <input v-model="form.uf" type="text" maxlength="2" placeholder="UF" />
      </label>
    </div>

    <div class="grid">
      <label class="field">
        <span>Bairro</span>
        <input v-model="form.bairro" type="text" placeholder="Bairro" />
      </label>
      <label class="field">
        <span>Cidade</span>
        <input v-model="form.cidade" type="text" placeholder="Cidade" />
      </label>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch, ref } from "vue";
import { criarEnderecoVazio } from "../utils/endereco";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => criarEnderecoVazio(),
  },
});

const emit = defineEmits(["update:modelValue"]);

const form = reactive({ ...criarEnderecoVazio(), ...props.modelValue });
  const suggestions = ref([])

const queryLogradouro = form.logradouro || ref(form.logradouro);
let queryTimer = null

watch(
  () => props.modelValue,
  (valor) => {
    if (!valor || typeof valor !== "object") return;
    Object.assign(form, criarEnderecoVazio(), valor);
    // keep the visible street query in sync when parent updates the model
    queryLogradouro.value = form.logradouro || ""
  }
);

watch(
  form,
  () => {
    emit("update:modelValue", { ...form });
  },
  { deep: true }
);

function onQueryChange() {
  if (queryTimer) clearTimeout(queryTimer)
  queryTimer = setTimeout(fetchSuggestions, 350)
}

function formatSuggestionLabel(item) {
  const addr = item.address || {}
  // tente extrair o nome da rua (road, pedestrian, residential, etc.)
  const streetKeys = ['road', 'pedestrian', 'residential', 'street', 'footway', 'path', 'house_number', 'suburb']
  for (const k of streetKeys) {
    if (addr[k]) return addr[k]
  }
  // fallback: pegar a primeira parte do display_name (antes da primeira vírgula)
  if (item.display_name) return item.display_name.split(',')[0].trim()
  return ''
}

async function fetchSuggestions() {
  const q = queryLogradouro.value && queryLogradouro.value.trim()
  if (!q || q.length < 3) {
    suggestions.value = []
    return
  }

  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=6&q=${encodeURIComponent(q)}&countrycodes=br`
    const res = await fetch(url, { headers: { 'Accept-Language': 'pt-BR' } })
    const data = await res.json()
    // armazenar também label curto (rua) e displayText (rua, cidade, bairro) para cada sugestão
    suggestions.value = (data || []).map((item) => {
      const addr = item.address || {}
      const label = formatSuggestionLabel(item)
      const city = addr.city || addr.town || addr.village || addr.county || ''
      const bairro = addr.suburb || addr.neighbourhood || ''
      const displayParts = [label]
      if (city) displayParts.push(city)
      if (bairro) displayParts.push(bairro)
      const displayText = displayParts.filter(Boolean).join(', ')
      return { raw: item, label, displayText }
    })
  } catch (e) {
    console.error('Erro ao buscar sugestões de endereço', e)
    suggestions.value = []
  }
}

function selectSuggestion(s) {
  // s is { raw, label }
  suggestions.value = []
  const item = s.raw
  const label = s.label || formatSuggestionLabel(item)
  queryLogradouro.value = label
  // preencher campos a partir de address
  const addr = item.address || {}
  form.logradouro = label || [addr.road, addr.pedestrian, addr.neighbourhood, addr.suburb].filter(Boolean)[0] || item.display_name
  form.bairro = addr.suburb || addr.neighbourhood || form.bairro
  form.cidade = addr.city || addr.town || addr.village || addr.county || form.cidade
  form.uf = (addr.state || form.uf).slice(0,2).toUpperCase()
  form.latitude = item.lat
  form.longitude = item.lon
  // emitimos o update do form (watch já faz isso)
}
</script>

<style scoped>
.endereco-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field span {
  font-size: 13px;
  font-weight: 500;
  color: #334155;
}

.field input {
  padding: 12px 14px;
  border-radius: 12px;
  height: 20px;
  border: 1px solid rgba(51, 65, 85, 0.2);
  background: #f8fafc;
  font-size: 14px;
  color: #0f172a;
}

.field input:focus {
  border-color: #2563eb;
  outline: none;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.16);
}

.autocomplete-input {
  position: relative;
  z-index: 30;
}

.suggestions {
  position: absolute;
  z-index: 9999;
  left: 0;
  min-width: 220px;
  max-width: 720px;
  width: calc(100% - 2px);
  background: #fff;
  border: 1px solid rgba(51,65,85,0.12);
  border-radius: 8px;
  margin-top: 70px;
  max-height: 260px;
  overflow: auto;
  list-style: none;
  padding: 6px 0;
  box-shadow: 0 8px 20px rgba(2,6,23,0.08);
}

.suggestions li {
  padding: 8px 12px;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.suggestions li:hover { background: #f1f5f9 }


/* city suggestions removed - reliant on street autocomplete */
</style>
