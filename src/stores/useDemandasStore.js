import { ref, computed } from "vue"
import { formatarEnderecoCurto, normalizarEnderecoObjeto, enderecoPossuiDados } from "../utils/endereco"
import { demandasApi } from "../services/demandasApi"
import { actionApi } from "@/services/actionApi"

const itens = ref([])
const isLoading = ref(false)
const error = ref(null)
let nextId = 1

function normalizarStatus(status) {
  if (!status) return "pendente"
  return status
    .normalize("NFD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
}

function normalizarTipo(tipo) {
  return (tipo || "Tarefa").toLowerCase()
}

function mapApiToInternalTasks(apiData) {
  const tipo = "Tarefa"
  const status = mapApiStatus(apiData.status)


  return {
    id: apiData.id,
    createdAt: apiData.createdAt || new Date().toISOString(),
    tipo,
    categoria: apiData.categories?.[0]?.name || tipo,
    titulo: apiData.title || "Sem título",
    descricao: apiData.description || "",
    descricaoResumida: (apiData.description || "").slice(0, 105),
    enderecoDetalhado: null,
    enderecoResumo: "",
    local: "Não informado",
    data: apiData.date
      ? new Date(apiData.date).toISOString().split("T")[0]
      : "",
    status,
    anexos: [],
    latitude: null,
    longitude: null,
    statusSlug: normalizarStatus(status),
    tipoSlug: normalizarTipo(tipo),
    icon:
      normalizarTipo(tipo) === "acao"
        ? "target"
        : "clipboard-text-outline",

    // IDs originais da API
    advisorId: apiData.advisorId,
    contactId: apiData.contactId,
    priority: apiData.priority,
  }
}
function mapApiToInternalActions(apiData) {
  const tipo = "Acao"
  const status = mapApiStatus(apiData.status)


  return {
    id: apiData.id,
    createdAt: apiData.createdAt || new Date().toISOString(),
    tipo,
    categoria: apiData.category?.name || tipo,
    titulo: apiData.title || "Sem título",
    descricao: apiData.description || "",
    descricaoResumida: (apiData.description || "").slice(0, 105),
    data: apiData.date
      ? new Date(apiData.date).toISOString().split("T")[0]
      : "",
    status,
    statusSlug: normalizarStatus(status),
    tipoSlug: normalizarTipo(tipo),
    priority: apiData.priority,
  }
}



function mapApiStatus(apiStatus) {
  const statusMap = {
    PENDENTE: "Pendente",
    EM_ANDAMENTO: "Em andamento",
    CONCLUIDA: "Concluida",
    CANCELADA: "Cancelada",
  }
  return statusMap[apiStatus] || apiStatus || "Pendente"
}

function mapInternalToApi(internalData) {
  const statusMap = {
    pendente: "PENDENTE",
    "em-andamento": "EM_ANDAMENTO",
    andamento: "EM_ANDAMENTO",
    concluida: "CONCLUIDA",
    concluido: "CONCLUIDA",
    cancelada: "CANCELADA",
  }

  const priorityMap = {
    baixa: "BAIXA",
    media: "MEDIA",
    alta: "ALTA",
  }

  return {
    advisorId: internalData.advisorId,
    title: internalData.titulo,
    description: internalData.descricao,
    date: internalData.data ? new Date(internalData.data).toISOString() : new Date().toISOString(),
    contactId: internalData.contactId,
    status: statusMap[internalData.statusSlug] || "PENDENTE",
    priority: priorityMap[internalData.priority?.toLowerCase()] || "MEDIA",
    addressId: internalData.addressId,
    categories: internalData.categoryId ? [{ id: internalData.categoryId }] : [],
  }
}

function gerarDemandaBase(payload = {}) {
  const descricaoCompleta = payload.descricao || ""
  const tipo = payload.tipo || "Tarefa"
  const status = payload.status || "Pendente"
  const anexos = payload.anexos ? payload.anexos.map((item) => ({ ...item })) : []

  const enderecoDetalhado = normalizarEnderecoObjeto(payload.endereco ?? payload.enderecoDetalhado)
  const possuiEnderecoDetalhado = enderecoDetalhado && enderecoPossuiDados(enderecoDetalhado)
  const enderecoObjeto = possuiEnderecoDetalhado ? enderecoDetalhado : null

  const candidatosResumo = [
    typeof payload.enderecoResumo === "string" ? payload.enderecoResumo.trim() : "",
    typeof payload.local === "string" ? payload.local.trim() : "",
    typeof payload.endereco === "string" ? payload.endereco.trim() : "",
    enderecoObjeto ? formatarEnderecoCurto(enderecoObjeto) : "",
  ]
  const enderecoResumo = candidatosResumo.find((valor) => valor) || ""
  const enderecoTexto = enderecoResumo || "Nao informado"

  return {
    id: payload.id ?? nextId++,
    createdAt: payload.createdAt ?? new Date().toISOString(),
    tipo,
    categoria: payload.categoria || tipo,
    titulo: payload.titulo || "Sem titulo",
    descricao: descricaoCompleta,
    descricaoResumida: descricaoCompleta.slice(0, 140),
    solicitante: payload.solicitante || "Nao informado",
    contato: payload.contato || payload.solicitante || "Nao informado",
    endereco: enderecoObjeto ?? enderecoTexto,
    enderecoDetalhado: enderecoObjeto,
    enderecoResumo,
    local: enderecoTexto,
    data: payload.data || "",
    status,
    anexos,
    latitude: payload.latitude ?? null,
    longitude: payload.longitude ?? null,
    statusSlug: normalizarStatus(status),
    tipoSlug: normalizarTipo(tipo),
    icon: payload.icon || (normalizarTipo(tipo) === "acao" ? "target" : "clipboard-text-outline"),
    // isFavorito removed
    // Keep API-specific fields
    advisorId: payload.advisorId,
    contactId: payload.contactId,
    addressId: payload.addressId,
    priority: payload.priority,
  }
}

export function useDemandasStore() {
  const demandasOrdenadas = computed(() =>
    [...itens.value].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
  )

  // favoritos removed

  const contagemStatus = computed(() =>
    itens.value.reduce(
      (acc, item) => {
        const slug = item.statusSlug
        if (slug.includes("pendente")) acc.pendente += 1
        else if (slug.includes("andamento")) acc.andamento += 1
        else if (slug.includes("concl")) acc.concluido += 1
        else if (slug.includes("cancel")) acc.cancelado += 1
        else acc.outros += 1
        return acc
      },
      { pendente: 0, andamento: 0, concluido: 0, cancelado: 0, outros: 0 },
    ),
  )

  const fetchDemandas = async () => {
    isLoading.value = true
    error.value = null
    try {
      const apiData = await demandasApi.getAll()
      console.log("[v0] API response:", apiData)

      // Map API data to internal format
      // Primeiro substitui pelos tasks (se existirem)
      itens.value = Array.isArray(apiData?.data?.tasks)
        ? apiData.data.tasks.map(mapApiToInternalTasks)
        : [];

      // Depois adiciona os actions (se existirem)
      if (Array.isArray(apiData?.data?.actions)) {
        itens.value.push(
          ...apiData.data.actions.map(mapApiToInternalActions)
        );
      }

      console.log("[v0] Mapped demands:", itens.value)
    } catch (err) {
      error.value = err.message || "Erro ao carregar demandas"
      console.error("[v0] Error loading demands:", err)
      // Keep empty array on error
      itens.value = []
    } finally {
      isLoading.value = false
    }
  }

  const addDemanda = async (payload) => {
    try {
      const apiPayload = mapInternalToApi(gerarDemandaBase(payload))
      const response = await demandasApi.create(apiPayload)
      const newDemand = mapApiToInternal(response)
      itens.value.push(newDemand)
      return newDemand
    } catch (err) {
      console.error("[v0] Error adding demand:", err)
      throw err
    }
  }

  const addTarefa = async (dados) => {
    return addDemanda({
      tipo: "Tarefa",
      ...dados,
    })
  }

  const addAcao = async (dados) => {
    return addDemanda({
      tipo: "Acao",
      ...dados,
    })
  }

  const updateDemanda = async (id, dados) => {
    const index = itens.value.findIndex((item) => item.id === id || item.id === Number(id))
    if (index === -1) return false

    try {
      const atual = itens.value[index]
      const updated = gerarDemandaBase({
        ...atual,
        ...dados,
        id: atual.id,
        createdAt: atual.createdAt,
      })

      const apiPayload = mapInternalToApi(updated)
      const response = await demandasApi.update(id, apiPayload)
      itens.value[index] = mapApiToInternal(response)
      return true
    } catch (err) {
      console.error("[v0] Error updating demand:", err)
      throw err
    }
  }

  const updateStatus = async (id, newStatus, tipo) => {
    console.log(tipo)
    const index = itens.value.findIndex((item) => item.id === id || item.id === Number(id))
    if (index === -1) return false

    try {
      const statusMap = {
        pendente: "PENDENTE",
        "em-andamento": "EM_ANDAMENTO",
        andamento: "EM_ANDAMENTO",
        concluida: "CONCLUIDO",
        concluido: "CONCLUIDO",
        cancelado: "CANCELADO",
      }

      const apiStatus = statusMap[newStatus.toLowerCase().replace(/\s+/g, "-")] || "PENDENTE"
      if (tipo === "Tarefa") {
      const response = await demandasApi.updateStatus(id, apiStatus)
      itens.value[index] = mapApiToInternalTasks(response.data)
      } else if (tipo === "Acao") {
      const response = await actionApi.updateStatus(id, apiStatus)
      itens.value[index] = mapApiToInternalActions(response.data)
    }
      return true
    } catch (err) {
      console.error("[v0] Error updating status:", err)
      throw err
    }
  }

  const removeDemanda = async (id) => {
    try {
      await demandasApi.delete(id)
      itens.value = itens.value.filter((item) => item.id !== id && item.id !== Number(id))
      return true
    } catch (err) {
      console.error("[v0] Error removing demand:", err)
      throw err
    }
  }

  // toggleFavorito removed

  const getById = (id) => itens.value.find((item) => item.id === id || item.id === Number(id))

  return {
    demandas: demandasOrdenadas,
    countsPorStatus: contagemStatus,
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    fetchDemandas,
    addTarefa,
    addAcao,
    addDemanda,
    updateDemanda,
    updateStatus,
    removeDemanda,
    getById,
  }
}
