<template>
  <div class="eleicoes-page">
    <div class="header">
      <div class="title">
        <div class="title-icon">
          <mdicon name="vote" :size="24" />
        </div>
        <div>
          <h2 class="main-title">Eleição 2024</h2>
          <p class="subtitle">Resultado Eleitoral 2024 - Vereador Lúcio Flávio</p>
        </div>
      </div>
    </div>

    <section class="summary-cards">
      <div class="info-card">
        <p class="card-title">Total de Votos Absolutos</p>
        <p class="card-value">3.847</p>
      </div>
      <div class="info-card">
        <p class="card-title">Média Percentual por Bairro</p>
        <p class="card-value">1.27%</p>
      </div>
    </section>

    <section class="content-card chart-card">
      <h3 class="card-header">10 Bairros com Mais Votos em 2024</h3>
      <div class="chart-container">
        <BarChart v-if="dadosGrafico.length" :chart-data="chartDataForComponent" />
      </div>
    </section>

    <section class="content-card table-card">
      <div class="table-header">
        <h3 class="card-header">Resultados por Bairro</h3>
        <div class="search-bar">
          <mdicon name="magnify" :size="20" class="search-icon" />
          <input
            v-model="buscaBairro"
            type="search"
            placeholder="Buscar bairro..."
          />
        </div>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Bairro</th>
              <th>Percentual (%)</th>
              <th>Votos Absolutos</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="bairrosFiltrados.length === 0">
              <td colspan="3" class="empty-state">Nenhum bairro encontrado.</td>
            </tr>
            <tr v-for="bairro in bairrosFiltrados" :key="bairro.nome">
              <td>{{ bairro.nome }}</td>
              <td>{{ bairro.percentual }}%</td>
              <td>{{ bairro.votos }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import BarChart from '../components/BarChart.vue';

const buscaBairro = ref('');

const resultadosBairros = ref([
  { nome: 'FAROLANDIA', percentual: 1.45, votos: 357 },
  { nome: 'GRAGERU', percentual: 2.91, votos: 342 },
  { nome: 'JABOTIANA', percentual: 2.20, votos: 223 },
  { nome: 'SALGADO FILHO', percentual: 3.26, votos: 178 },
  { nome: 'LUZIA', percentual: 2.31, votos: 171 },
  { nome: 'SUISSA', percentual: 1.85, votos: 150 },
  { nome: 'PONTO NOVO', percentual: 1.95, votos: 145 },
  { nome: 'CENTRO', percentual: 2.10, votos: 139 },
  { nome: 'SÃO CONRADO', percentual: 1.59, votos: 240 }, 
  { nome: 'JARDINS', percentual: 2.74, votos: 195 },
]);

const dadosGrafico = computed(() => {
  return [...resultadosBairros.value] 
    .sort((a, b) => b.votos - a.votos)
    .slice(0, 10);
});

const chartDataForComponent = computed(() => ({
  labels: dadosGrafico.value.map(bairro => bairro.nome),
  datasets: [
    {
      label: 'Votos',
      backgroundColor: '#1565C0',
      data: dadosGrafico.value.map(bairro => bairro.votos),
      borderRadius: 4, 
    },
  ],
}));

const bairrosFiltrados = computed(() => {
  if (!buscaBairro.value.trim()) {
    return resultadosBairros.value;
  }
  const termo = buscaBairro.value.toLowerCase();
  return resultadosBairros.value.filter(bairro =>
    bairro.nome.toLowerCase().includes(termo)
  );
});

</script>

<style scoped>
.eleicoes-page {
  padding: 24px 32px 48px;
  font-family: "Poppins", sans-serif;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.title {
  display: flex;
  align-items: center;
  gap: 16px;
}

.title-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1565c0 0%, #163b66 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
}

.main-title {
  font-size: 24px;
  font-weight: 700;
  color: #1a202c;
  margin: 0;
}

.subtitle {
  font-size: 16px;
  color: #718096;
  margin: 4px 0 0;
}

.summary-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.info-card {
  background: #ffffff;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(21, 101, 192, 0.08);
  border: 1px solid #e2e8f0;
}

.info-card .card-title {
  font-size: 16px;
  color: #4a5568;
  margin: 0 0 8px;
}

.info-card .card-value {
  font-size: 36px;
  font-weight: 700;
  color: #1565c0;
  margin: 0;
}

.content-card {
  background: #ffffff;
  padding: 24px 32px;
  border-radius: 20px;
  box-shadow: 0 8px 16px rgba(21, 101, 192, 0.08);
  border: 1px solid #e2e8f0;
  margin-bottom: 32px;
}

.card-header {
  font-size: 20px;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 24px;
}

.chart-container {
  position: relative;
  height: 350px;
}


.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 16px;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f7f8fd;
  border-radius: 12px;
  padding: 8px 12px;
  width: 100%;
  max-width: 320px;
  border: 1px solid #e2e8f0;
}

.search-bar .search-icon {
  color: #a0aec0;
}

.search-bar input {
  width: 100%;
  border: none;
  background: transparent;
  outline: none;
  font-size: 15px;
  color: #2d3748;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

th, td {
  padding: 16px;
  border-bottom: 1px solid #e2e8f0;
}

thead th {
  font-size: 14px;
  font-weight: 600;
  color: #718096;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

tbody tr:hover {
  background-color: #f7fafc;
}

td {
  font-size: 16px;
  color: #2d3748;
}

.empty-state {
  text-align: center;
  padding: 48px;
  color: #a0aec0;
}
</style>