import { ref, computed } from "vue";

const itens = ref([]);
let nextId = 1;

function normalizarStatus(status) {
  if (!status) return "pendente";
  return status
    .normalize("NFD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}

function normalizarTipo(tipo) {
  return (tipo || "Tarefa").toLowerCase();
}

function gerarDemandaBase(payload = {}) {
  const descricaoCompleta = payload.descricao || "";
  const tipo = payload.tipo || "Tarefa";
  const status = payload.status || "Pendente";
  const anexos = payload.anexos ? payload.anexos.map((item) => ({ ...item })) : [];

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
    endereco: payload.endereco || payload.local || "Nao informado",
    local: payload.local || payload.endereco || "Nao informado",
    data: payload.data || "",
    status,
    anexos,
    statusSlug: normalizarStatus(status),
    tipoSlug: normalizarTipo(tipo),
    icon: payload.icon || (normalizarTipo(tipo) === "acao" ? "target" : "clipboard-text-outline"),
    isFavorito: payload.isFavorito ?? false,
  };
}

export function useDemandasStore() {
  const demandasOrdenadas = computed(() =>
    [...itens.value].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  );

  const favoritosOrdenados = computed(() => demandasOrdenadas.value.filter((item) => item.isFavorito));

  const contagemStatus = computed(() =>
    itens.value.reduce(
      (acc, item) => {
        const slug = item.statusSlug;
        if (slug.includes("pendente")) acc.pendente += 1;
        else if (slug.includes("andamento")) acc.andamento += 1;
        else if (slug.includes("concl")) acc.concluido += 1;
        else acc.outros += 1;
        return acc;
      },
      { pendente: 0, andamento: 0, concluido: 0, outros: 0 }
    )
  );

  const addDemanda = (payload) => {
    itens.value.push(gerarDemandaBase(payload));
  };

  const addTarefa = (dados) => {
    addDemanda({
      tipo: "Tarefa",
      ...dados,
    });
  };

  const addAcao = (dados) => {
    addDemanda({
      tipo: "Acao",
      ...dados,
    });
  };

  const updateDemanda = (id, dados) => {
    const index = itens.value.findIndex((item) => item.id === Number(id));
    if (index === -1) return false;
    const atual = itens.value[index];
    itens.value[index] = gerarDemandaBase({
      ...atual,
      ...dados,
      id: atual.id,
      createdAt: atual.createdAt,
      isFavorito: dados.isFavorito ?? atual.isFavorito,
    });
    return true;
  };

  const removeDemanda = (id) => {
    itens.value = itens.value.filter((item) => item.id !== Number(id));
  };

  const toggleFavorito = (id) => {
    const item = itens.value.find((registro) => registro.id === Number(id));
    if (!item) return;
    item.isFavorito = !item.isFavorito;
  };

  const getById = (id) => itens.value.find((item) => item.id === Number(id));

  return {
    demandas: demandasOrdenadas,
    favoritos: favoritosOrdenados,
    countsPorStatus: contagemStatus,
    addTarefa,
    addAcao,
    addDemanda,
    updateDemanda,
    removeDemanda,
    toggleFavorito,
    getById,
  };
}
