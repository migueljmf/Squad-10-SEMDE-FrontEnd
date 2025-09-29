<template>
  <section class="dashboard">
    <header class="dashboard__header">
      <div>
        <p class="dashboard__pretitle">Painel de acompanhamento</p>
        <h1>Resumo geral das demandas</h1>
        <p class="dashboard__subtitle">
          Visualize rapidamente quantas solicitacoes estao pendentes, em andamento ou concluidas e acompanhe os itens mais recentes.
        </p>
      </div>
      <div class="dashboard__actions">
        <RouterLink to="/cadastrar-tarefa" class="btn btn-primary">Nova tarefa</RouterLink>
        <RouterLink to="/cadastrar-acao" class="btn btn-secondary">Nova acao</RouterLink>
      </div>
    </header>

    <section class="kpis">
      <article class="kpi">
        <p class="kpi__label">Demandas totais</p>
        <p class="kpi__value">{{ totalDemandas }}</p>
      </article>
      <article class="kpi">
        <p class="kpi__label">Concluidas</p>
        <p class="kpi__value">{{ counts.concluido }}</p>
        <span class="kpi__helper">{{ progressoGeral }}% do total</span>
      </article>
      <article class="kpi">
        <p class="kpi__label">Em andamento</p>
        <p class="kpi__value">{{ counts.andamento }}</p>
      </article>
      <article class="kpi">
        <p class="kpi__label">Pendentes</p>
        <p class="kpi__value">{{ counts.pendente }}</p>
      </article>
    </section>

    <section class="panels">
      <article class="panel">
        <header class="panel__header">
          <h2>Ultimas movimentacoes</h2>
          <RouterLink to="/gestao-demandas" class="panel__link">Ver todas</RouterLink>
        </header>

        <ul v-if="recentes.length" class="list">
          <li v-for="item in recentes" :key="item.id" class="list__item">
            <div>
              <strong>{{ item.titulo }}</strong>
              <span class="list__meta">{{ formatarStatus(item.status) }} &bull; {{ formatarData(item.createdAt) }}</span>
            </div>
            <span class="badge" :class="'badge--' + item.tipoSlug">{{ item.tipo }}</span>
          </li>
        </ul>
        <p v-else class="panel__empty">Cadastre uma tarefa ou acao para preencher o painel.</p>
      </article>

 <article class="panel">
        <header class="panel__header">
          <h2>Favoritos</h2>
          <RouterLink to="/gestao-demandas/favoritos" class="panel__link">Gerenciar</RouterLink>
        </header>
        <ul v-if="favoritos.length" class="list">
          <li v-for="item in favoritos" :key="item.id" class="list__item">
            <div>
              <strong>{{ item.titulo }}</strong>
              <span class="list__meta">{{ formatarStatus(item.status) }}</span>
            </div>
            <time class="list__time" :datetime="item.createdAt">{{ formatarData(item.createdAt) }}</time>
          </li>
        </ul>
        <p v-else class="panel__empty">Nenhum favorito selecionado ainda.</p>
      </article>
    </section>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useDemandasStore } from '../stores/useDemandasStore'

const store = useDemandasStore()

const demandas = computed(() => store?.demandas?.value ?? [])
const counts = computed(() => store?.countsPorStatus?.value ?? { pendente: 0, andamento: 0, concluido: 0, outros: 0 })
const favoritos = computed(() => store?.favoritos?.value?.slice(0, 5) ?? [])
const recentes = computed(() => demandas.value.slice(0, 5))
const totalDemandas = computed(() => demandas.value.length)
const progressoGeral = computed(() => {
  if (!totalDemandas.value) return 0
  return Math.round((counts.value.concluido / totalDemandas.value) * 100)
})

function formatarData(valor) {
  if (!valor) return 'Sem data'
  const data = new Date(valor)
  if (Number.isNaN(data.getTime())) return 'Sem data'
  return data.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).replace('.', '')
}

function formatarStatus(status) {
  if (!status) return 'Sem status'
  const texto = status.toString().trim()
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase()
}
</script>

<style scoped>
.dashboard {
  min-height: calc(100vh - 96px);
  padding: clamp(28px, 4vw, 48px);
  background: #f3f6ff;
  display: grid;
  gap: clamp(20px, 4vw, 32px);
  box-sizing: border-box;
}

.dashboard__header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;
}

.dashboard__pretitle {
  text-transform: uppercase;
  font-size: 0.78rem;
  letter-spacing: 0.4px;
  color: #4b5877;
  margin: 0 0 4px;
}

.dashboard__header h1 {
  margin: 0;
  font-size: clamp(1.8rem, 3vw, 2.2rem);
  color: #102a4d;
}

.dashboard__subtitle {
  margin: 12px 0 0;
  max-width: 520px;
  color: #4b5877;
  line-height: 1.5;
}

.dashboard__actions {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 999px;
  padding: 12px 22px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.2s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #2eb872 0%, #43a047 100%);
  color: #ffffff;
  box-shadow: 0 12px 24px rgba(46, 184, 114, 0.26);
}

.btn-secondary {
  background: rgba(27, 101, 192, 0.12);
  color: #1b3f6a;
}

.btn:hover {
  transform: translateY(-1px);
}

.kpis {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 18px;
}

.kpi {
  background: #ffffff;
  padding: 20px 24px;
  border-radius: 20px;
  box-shadow: 0 12px 24px rgba(15, 35, 75, 0.12);
  display: grid;
  gap: 8px;
}

.kpi__label {
  margin: 0;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: #4b5877;
}

.kpi__value {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  color: #102a4d;
}

.kpi__helper {
  font-size: 0.85rem;
  color: #2eb872;
}

.panels {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.panel {
  background: #ffffff;
  border-radius: 24px;
  padding: 24px 28px;
  box-shadow: 0 14px 28px rgba(15, 35, 75, 0.12);
  display: grid;
  gap: 18px;
}

.panel__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.panel__header h2 {
  margin: 0;
  font-size: 1.2rem;
  color: #102a4d;
}

.panel__link {
  color: #1b65c0;
  font-weight: 600;
  text-decoration: none;
}

.list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 14px;
}

.list__item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  border-radius: 16px;
  background: rgba(27, 101, 192, 0.06);
}

.list__item strong {
  display: block;
  margin-bottom: 4px;
  color: #102a4d;
}

.list__meta {
  font-size: 0.85rem;
  color: #4b5877;
}

.list__time {
  font-size: 0.85rem;
  color: #4b5877;
}

.badge {
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.badge--acao {
  background: rgba(27, 101, 192, 0.18);
  color: #1b65c0;
}

.badge--tarefa {
  background: rgba(46, 184, 114, 0.18);
  color: #2eb872;
}

.panel__empty {
  padding: 24px;
  text-align: center;
  border-radius: 18px;
  background: rgba(27, 101, 192, 0.06);
  color: #4b5877;
}

@media (max-width: 768px) {
  .dashboard__actions {
    width: 100%;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .panels {
    grid-template-columns: 1fr;
  }
}
</style>
