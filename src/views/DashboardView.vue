<template>
  <div class="dashboard">
    <PageHero
      title="Visao Geral"
      description="Acompanhe os principais indicadores e acompanhe a evolucao das demandas do mandato."
      highlight-label="Demandas monitoradas"
      :highlight-value="totalDemandasFormatado"
      highlight-subtext="Atualizado em tempo real com base nos registros mais recentes."
    >
      <template #extra>
        <div class="hero-actions">
          <button type="button" class="hero-btn">
            Exportar relatorio
          </button>
        </div>
      </template>
    </PageHero>

    <section class="summary-grid">
      <article
        v-for="card in resumoCards"
        :key="card.title"
        class="summary-card"
      >
        <div class="summary-card__meta">
          <h2>{{ card.title }}</h2>
          <span v-if="card.delta" :class="['summary-card__delta', card.trend]">
            {{ card.delta }}
          </span>
        </div>
        <p class="summary-card__valor">{{ card.value }}</p>
        <p class="summary-card__sub">{{ card.subtitle }}</p>
      </article>
    </section>

    <section class="charts-grid">
      <article class="chart-card large">
        <header class="chart-card__header">
          <div>
            <h2>Demandas criadas por mes</h2>
            <p>Comparativo dos ultimos seis meses</p>
          </div>
          <span class="badge">{{ tendenciaMensal }}</span>
        </header>
        <div class="chart-card__body">
          <svg class="line-chart" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#2563eb" stop-opacity="0.45" />
                <stop offset="100%" stop-color="#2563eb" stop-opacity="0" />
              </linearGradient>
            </defs>
            <path
              v-if="lineAreaPath"
              :d="lineAreaPath"
              fill="url(#lineGradient)"
              class="line-area"
            />
            <polyline
              v-if="linePolylinePoints"
              :points="linePolylinePoints"
              class="line-stroke"
            />
            <g v-for="(ponto, index) in linePoints" :key="index" class="line-point">
              <circle :cx="ponto.x" :cy="ponto.y" r="1.2" />
            </g>
          </svg>
          <ul class="axis-labels">
            <li v-for="item in lineChartData" :key="item.label">{{ item.label }}</li>
          </ul>
        </div>
      </article>

      <article class="chart-card">
        <header class="chart-card__header">
          <div>
            <h2>Status das demandas</h2>
            <p>Distribuicao atual entre os status principais</p>
          </div>
        </header>
        <div class="chart-card__body donut-wrapper">
          <div class="donut" :style="donutStyle">
            <div class="donut__center">
              <span>{{ statusPercentuais.concluido }}%</span>
              <small>Concluido</small>
            </div>
          </div>
          <ul class="legend">
            <li v-for="segmento in donutSegmentos" :key="segmento.label">
              <span class="legend__dot" :style="{ backgroundColor: segmento.color }"></span>
              <div>
                <strong>{{ segmento.label }}</strong>
                <small>{{ segmento.value }} registros</small>
              </div>
            </li>
          </ul>
        </div>
      </article>

      <article class="chart-card">
        <header class="chart-card__header">
          <div>
            <h2>Acoes por categoria</h2>
            <p>Totais de acoes agrupados por categoria</p>
          </div>
        </header>
        <div class="chart-card__body barras">
          <div class="bars" v-if="barrasCategorias.length">
            <div
              v-for="barra in barrasCategorias"
              :key="barra.label"
              class="bars__item"
            >
              <div
                class="bars__item__fill"
                :style="{ height: barra.percentagem + '%' }"
                :aria-label="barra.value + ' acoes em ' + barra.label"
              ></div>
              <span class="bars__item__label">{{ barra.label }}</span>
            </div>
          </div>
          <p v-else class="empty-state">Nenhuma acao cadastrada ate o momento.</p>
        </div>
      </article>

      <article class="chart-card wide">
        <header class="chart-card__header">
          <div>
            <h2>Atualizacoes recentes</h2>
            <p>Movimentacoes mais recentes nas demandas</p>
          </div>
        </header>
        <div class="chart-card__body atividades">
          <ul v-if="atividadesRecentes.length">
            <li v-for="registro in atividadesRecentes" :key="registro.id">
              <span class="atividade__hora">{{ registro.hora }}</span>
              <div class="atividade__info">
                <strong>{{ registro.titulo }}</strong>
                <p>{{ registro.descricao }}</p>
              </div>
              <span class="atividade__tag" :class="`tag-${registro.tag}`">{{ registro.tagLabel }}</span>
            </li>
          </ul>
          <p v-else class="empty-state">Sem registros para exibir.</p>
        </div>
      </article>
    </section>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { onMounted } from "vue";
import PageHero from "@/components/PageHero.vue";
import { useDemandasStore } from "../stores/useDemandasStore";


const store = useDemandasStore();

onMounted(async () => {
  await store.fetchDemandas();
});

onMounted(async () => {
  await store.fetchDemandas();
});

const statusCounts = computed(() => store.countsPorStatus.value);

const totalDemandas = computed(() => store.demandas.value.length);
const totalDemandasFormatado = computed(() =>
  totalDemandas.value.toLocaleString("pt-BR")
);

const totalPendentes = computed(() => statusCounts.value.pendente || 0);

const acoesEmAndamento = computed(() =>
  store.demandas.value.filter((item) => {
    const tipo = (item.tipoSlug || item.tipo || "").toLowerCase();
    const status = (item.statusSlug || item.status || "").toLowerCase();
    return tipo.includes("acao") && status.includes("andamento");
  }).length
);

const tempoMedioConclusao = computed(() => {
  const concluidas = store.demandas.value.filter((item) => {
    const status = (item.statusSlug || item.status || "").toLowerCase();
    return status.includes("conclu");
  });
  if (!concluidas.length) return null;

  const duracoes = concluidas
    .map((item) => {
      const inicio = new Date(item.createdAt || Date.now());
      const fim = item.data ? new Date(`${item.data}T00:00:00`) : new Date(item.createdAt || Date.now());
      if (Number.isNaN(inicio.getTime()) || Number.isNaN(fim.getTime())) {
        return null;
      }
      const diffMs = Math.max(fim.getTime() - inicio.getTime(), 0);
      return diffMs / (1000 * 60 * 60 * 24);
    })
    .filter((valor) => valor !== null);

  if (!duracoes.length) return null;

  const media = duracoes.reduce((acc, valor) => acc + valor, 0) / duracoes.length;
  return Number(media.toFixed(1));
});

const demandasCriticas = computed(() => {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  return store.demandas.value.filter((item) => {
    const status = (item.statusSlug || item.status || "").toLowerCase();
    if (status.includes("conclu")) return false;
    if (!item.data) return false;
    const dataLimite = new Date(`${item.data}T00:00:00`);
    if (Number.isNaN(dataLimite.getTime())) return false;
    return dataLimite < hoje;
  }).length;
});

const resumoCards = computed(() => [
  {
    title: "Demandas abertas",
    value: totalPendentes.value,
    subtitle: totalPendentes.value ? "Em analise" : "Nenhuma pendente",
    delta: totalDemandas.value ? `${Math.round((totalPendentes.value / totalDemandas.value) * 100)}% do total` : null,
    trend: "positivo",
  },
  {
    title: "Acoes em andamento",
    value: acoesEmAndamento.value,
    subtitle: "Fluxo ativo",
    delta: null,
    trend: "positivo",
  },
  {
    title: "Tempo medio de conclusao",
    value: tempoMedioConclusao.value !== null ? `${tempoMedioConclusao.value} dias` : "-",
    subtitle: tempoMedioConclusao.value !== null ? "Ultimas demandas concluidas" : "Sem dados de conclusao",
    delta: null,
    trend: "neutro",
  },
  {
    title: "Indicadores criticos",
    value: demandasCriticas.value,
    subtitle: "Demandas atrasadas",
    delta: demandasCriticas.value > 0 ? "+" + demandasCriticas.value : null,
    trend: demandasCriticas.value > 0 ? "negativo" : "positivo",
  },
]);

const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

function gerarSerieMensal() {
  const agora = new Date();
  const mesesSerie = [];
  for (let i = 5; i >= 0; i -= 1) {
    const data = new Date(agora.getFullYear(), agora.getMonth() - i, 1);
    const chave = `${data.getFullYear()}-${data.getMonth()}`;
    mesesSerie.push({
      chave,
      label: meses[data.getMonth()],
      ano: data.getFullYear(),
      mes: data.getMonth(),
    });
  }

  const contagem = new Map(mesesSerie.map((item) => [item.chave, 0]));

  store.demandas.value.forEach((demanda) => {
    const data = new Date(demanda.createdAt || demanda.data || Date.now());
    if (Number.isNaN(data.getTime())) return;
    const chave = `${data.getFullYear()}-${data.getMonth()}`;
    if (contagem.has(chave)) {
      contagem.set(chave, (contagem.get(chave) || 0) + 1);
    }
  });

  return mesesSerie.map((item) => ({
    label: item.label,
    value: contagem.get(item.chave) || 0,
  }));
}

const lineChartData = computed(() => gerarSerieMensal());

const tendenciaMensal = computed(() => {
  if (lineChartData.value.length < 2) return "-";
  const ultimo = lineChartData.value[lineChartData.value.length - 1].value;
  const anterior = lineChartData.value[lineChartData.value.length - 2].value || 1;
  if (anterior === 0) return `${ultimo} novas`;
  const variacao = ((ultimo - anterior) / anterior) * 100;
  const prefixo = variacao >= 0 ? "+" : "";
  return `${prefixo}${Math.round(variacao)}% vs mes anterior`;
});

const chartTop = 8;
const chartBottom = 92;

const linePoints = computed(() => {
  if (!lineChartData.value.length) return [];
  const maxValor = Math.max(...lineChartData.value.map((item) => item.value), 1);
  const passoX = lineChartData.value.length > 1 ? 100 / (lineChartData.value.length - 1) : 100;

  return lineChartData.value.map((item, index) => {
    const porcentagem = item.value / maxValor;
    const y = chartBottom - porcentagem * (chartBottom - chartTop);
    return {
      x: Number((index * passoX).toFixed(2)),
      y: Number(y.toFixed(2)),
    };
  });
});

const linePolylinePoints = computed(() =>
  linePoints.value.map((ponto) => `${ponto.x},${ponto.y}`).join(" ")
);

const lineAreaPath = computed(() => {
  const pontos = linePoints.value;
  if (!pontos.length) return "";
  const primeira = pontos[0];
  const ultima = pontos[pontos.length - 1];
  const linhas = pontos
    .map((ponto, idx) => `${idx === 0 ? "M" : "L"} ${ponto.x},${ponto.y}`)
    .join(" ");
  return `${linhas} L ${ultima.x},${chartBottom} L ${primeira.x},${chartBottom} Z`;
});

const totalStatus = computed(() =>
  Object.values(statusCounts.value).reduce((acc, valor) => acc + valor, 0) || 1
);

const statusPercentuais = computed(() => ({
  concluido: Math.round((statusCounts.value.concluido / totalStatus.value) * 100),
  andamento: Math.round((statusCounts.value.andamento / totalStatus.value) * 100),
  pendente: Math.round((statusCounts.value.pendente / totalStatus.value) * 100),
}));

const donutSegmentos = computed(() => {
  const sequencia = [
    { label: "Concluido", value: statusCounts.value.concluido || 0, color: "#10b981" },
    { label: "Em andamento", value: statusCounts.value.andamento || 0, color: "#2563eb" },
    { label: "Pendente", value: statusCounts.value.pendente || 0, color: "#f59e0b" },
    { label: "Outros", value: Math.max(totalDemandas.value - (statusCounts.value.concluido + statusCounts.value.andamento + statusCounts.value.pendente), 0), color: "#94a3b8" },
  ].filter((item) => item.value > 0);

  let acumulado = 0;
  return sequencia.map((segmento) => {
    const grau = (segmento.value / totalStatus.value) * 360;
    const inicio = acumulado;
    acumulado += grau;
    return {
      ...segmento,
      start: inicio,
      end: acumulado,
    };
  });
});

const donutStyle = computed(() => {
  if (!donutSegmentos.value.length) {
    return {
      background: "#e2e8f0",
    };
  }
  const gradiente = donutSegmentos.value
    .map((segmento) => `${segmento.color} ${segmento.start.toFixed(2)}deg ${segmento.end.toFixed(2)}deg`)
    .join(", ");
  return {
    background: `conic-gradient(${gradiente})`,
  };
});

const barrasCategorias = computed(() => {
  const acoes = store.demandas.value.filter((item) => {
    const tipo = (item.tipoSlug || item.tipo || "").toLowerCase();
    return tipo.includes("acao");
  });

  const agrupado = acoes.reduce((acc, item) => {
    const chave = (item.categoria || "Sem categoria").trim() || "Sem categoria";
    acc[chave] = (acc[chave] || 0) + 1;
    return acc;
  }, {});

  const entradas = Object.entries(agrupado).map(([label, value]) => ({ label, value }));
  if (!entradas.length) return [];

  const maior = Math.max(...entradas.map((item) => item.value));
  return entradas.map((item) => ({
    ...item,
    percentagem: Math.round((item.value / maior) * 100),
  }));
});

function formatarHora(value) {
  const data = new Date(value);
  if (Number.isNaN(data.getTime())) return "--:--";
  return data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

const atividadesRecentes = computed(() =>
  [...store.demandas.value]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 5)
    .map((item) => {
      const status = (item.statusSlug || item.status || "").toLowerCase();
      let tag = "info";
      if (status.includes("conclu")) tag = "success";
      else if (status.includes("pendente")) tag = "warning";
      else if (status.includes("critico")) tag = "danger";

      return {
        id: item.id,
        hora: formatarHora(item.createdAt || Date.now()),
        titulo: item.titulo || "Demanda sem titulo",
        descricao: item.descricaoResumida || item.descricao || "Sem descricao",
        tag,
        tagLabel: item.status || "Status nao informado",
      };
    })
);
</script>

<style scoped>
.dashboard {
  padding: 56px 40px 56px;
  min-height: calc(100vh - 96px);
  background: linear-gradient(180deg, #f8fbff 0%, #f1f5f9 45%, #ffffff 100%);
  display: flex;
  flex-direction: column;
  gap: 32px;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.hero-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.hero-btn {
  border: none;
  padding: 12px 28px;
  background: linear-gradient(135deg, #2563eb, #1e40af);
  color: #fff;
  border-radius: 999px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 12px 24px rgba(37, 99, 235, 0.22);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.hero-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 32px rgba(37, 99, 235, 0.28);
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

.summary-card {
  background: #fff;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 20px 32px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: 1px solid rgba(148, 163, 184, 0.12);
}

.summary-card__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.summary-card__meta h2 {
  font-size: 16px;
  margin: 0;
  color: #0f172a;
}

.summary-card__delta {
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.summary-card__delta.positivo {
  background: rgba(22, 163, 74, 0.14);
  color: #15803d;
}

.summary-card__delta.negativo {
  background: rgba(239, 68, 68, 0.12);
  color: #b91c1c;
}

.summary-card__delta.neutro {
  background: rgba(148, 163, 184, 0.18);
  color: #475569;
}

.summary-card__valor {
  font-size: 34px;
  font-weight: 700;
  margin: 0;
  color: #0f172a;
}

.summary-card__sub {
  margin: 0;
  font-size: 13px;
  color: #64748b;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
}

.chart-card {
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 24px 40px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  padding: 28px;
  gap: 24px;
  border: 1px solid rgba(148, 163, 184, 0.12);
}

.chart-card.large {
  grid-column: span 2;
}

.chart-card.wide {
  grid-column: span 2;
}

.chart-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 14px;
}

.chart-card__header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #0f172a;
}

.chart-card__header p {
  margin: 6px 0 0;
  font-size: 13px;
  color: #64748b;
}

.chart-card__body {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.badge {
  background: rgba(37, 99, 235, 0.12);
  color: #1d4ed8;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}

.line-chart {
  width: 100%;
  height: 220px;
}

.line-area {
  stroke: none;
}

.line-stroke {
  fill: none;
  stroke: #2563eb;
  stroke-width: 1.6;
}

.line-point circle {
  fill: #2563eb;
  stroke: #ffffff;
  stroke-width: 0.6;
}

.axis-labels {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 12px;
  color: #475569;
}

.donut-wrapper {
  flex-direction: row;
  align-items: center;
  gap: 28px;
}

.donut {
  width: 200px;
  aspect-ratio: 1;
  border-radius: 50%;
  position: relative;
  box-shadow: inset 0 0 0 16px rgba(255, 255, 255, 0.85);
  display: grid;
  place-items: center;
}

.donut__center {
  width: 110px;
  aspect-ratio: 1;
  background: #fff;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
}

.donut__center span {
  font-size: 24px;
  font-weight: 700;
  color: #16a34a;
}

.donut__center small {
  font-size: 12px;
  color: #64748b;
}

.legend {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.legend li {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.legend__dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-top: 4px;
}

.legend strong {
  display: block;
  font-size: 14px;
  margin-bottom: 2px;
}

.legend small {
  color: #64748b;
  font-size: 12px;
}

.barras {
  align-items: flex-end;
}

.bars {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(48px, 1fr));
  gap: 18px;
  align-items: end;
}

.bars__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.bars__item__fill {
  width: 100%;
  min-height: 20px;
  border-radius: 12px 12px 6px 6px;
  background: linear-gradient(180deg, #3b82f6, #1d4ed8);
  box-shadow: 0 12px 22px rgba(29, 78, 216, 0.2);
  transition: height 0.4s ease, transform 0.2s ease;
}

.bars__item__fill:hover {
  transform: translateY(-4px);
}

.bars__item__label {
  font-size: 12px;
  color: #475569;
  text-align: center;
}

.atividades ul {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
  list-style: none;
}

.atividades li {
  display: grid;
  grid-template-columns: 80px 1fr auto;
  gap: 18px;
  padding: 18px 20px;
  border-radius: 18px;
  background: rgba(241, 245, 249, 0.75);
  border: 1px solid rgba(148, 163, 184, 0.14);
}

.atividade__hora {
  font-weight: 600;
  color: #0f172a;
}

.atividade__info strong {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
}

.atividade__info p {
  margin: 0;
  font-size: 13px;
  color: #475569;
}

.atividade__tag {
  align-self: start;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}

.tag-info {
  background: rgba(59, 130, 246, 0.14);
  color: #1d4ed8;
}

.tag-success {
  background: rgba(34, 197, 94, 0.14);
  color: #15803d;
}

.tag-warning {
  background: rgba(234, 179, 8, 0.18);
  color: #b45309;
}

.tag-danger {
  background: rgba(239, 68, 68, 0.18);
  color: #b91c1c;
}

.empty-state {
  margin: 0;
  font-size: 13px;
  color: #94a3b8;
}

@media (max-width: 1200px) {
  .chart-card.large,
  .chart-card.wide {
    grid-column: span 1;
  }

  .atividades li {
    grid-template-columns: 70px 1fr;
  }

  .atividade__tag {
    justify-self: end;
    margin-top: 8px;
  }
}

@media (max-width: 768px) {
  .dashboard {
    padding: 72px 20px 40px;
  }

  .chart-card {
    padding: 22px;
  }

  .donut-wrapper {
    flex-direction: column;
  }

  .atividades li {
    grid-template-columns: 1fr;
  }
}
</style>
