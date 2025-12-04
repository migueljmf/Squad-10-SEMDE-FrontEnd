<template>
  <div class="inicio-page">

    <section class="welcome-hero-card">
      <div class="hero-text">
        <h1 class="hero-title">
          Bem-vindo(a) ao <span class="app-name">Mandattum</span>
        </h1>
        <p class="hero-description">
         O Mandatuum é um sistema de gestão política focado em otimizar 
          a organização, a comunicação e as campanhas eleitorais. 
          Use nossas ferramentas de análise de dados, gestão de tarefas 
          e acompanhamento de ações para gerenciar suas atividades 
          de forma eficiente.
        </p>
        <RouterLink to="/dashboard" class="hero-cta-button">
          <mdicon name="view-dashboard" :size="20" />
          <span>Ver meu Dashboard</span>
        </RouterLink>
      </div>
      <div class="hero-image">
        <img src="../assets/img/logo.png" alt="Mandatuum Logo" />
      </div>
    </section>

    <section class="quick-access-section">
      <h2 class="section-title">Comece a trabalhar</h2>
      
      <div class="quick-access-grid">
        
        <RouterLink to="/gestao-demandas" class="access-card">
          <div class="access-card__icon" style="background-color: #E3F2FD; color: #1565C0;">
            <mdicon name="clipboard-list" :size="32" />
          </div>
          <h3 class="access-card__title">Gestão de Demandas</h3>
          <p class="access-card__sub">Organize e acompanhe tarefas.</p>
        </RouterLink>

        <RouterLink to="/tarefas" class="access-card">
          <div class="access-card__icon" style="background-color: #E0F7FA; color: #006064;">
            <mdicon name="checkbox-marked" :size="32" />
          </div>
          <h3 class="access-card__title">Mapa de Tarefas</h3>
          <p class="access-card__sub">Visualize as tarefas no mapa.</p>
        </RouterLink>

        <RouterLink to="/eleicoes" class="access-card">
          <div class="access-card__icon" style="background-color: #E8F5E9; color: #2E7D32;">
            <mdicon name="vote" :size="32" />
          </div>
          <h3 class="access-card__title">Relatório de Eleições</h3>
          <p class="access-card__sub">Analise os resultados de votos.</p>
        </RouterLink>

        <RouterLink to="/acoes" class="access-card">
          <div class="access-card__icon" style="background-color: #F3E5F5; color: #6A1B9A;">
            <mdicon name="account-group" :size="32" />
          </div>
          <h3 class="access-card__title">Acompanhar Ações</h3>
          <p class="access-card__sub">Veja o mapa de grupos de apoio.</p>
        </RouterLink>

        <RouterLink to="/financeiro" class="access-card">
          <div class="access-card__icon" style="background-color: #FFF3E0; color: #E65100;">
            <mdicon name="finance" :size="32" />
          </div>
          <h3 class="access-card__title">Financeiro</h3>
          <p class="access-card__sub">Controle as finanças da campanha.</p>
        </RouterLink>
        
        <RouterLink to="/dashboard" class="access-card">
          <div class="access-card__icon" style="background-color: #EDE7F6; color: #4527A0;">
            <mdicon name="view-dashboard" :size="32" />
          </div>
          <h3 class="access-card__title">Dashboard</h3>
          <p class="access-card__sub">Veja os indicadores e gráficos.</p>
        </RouterLink>

      </div>
    </section>

  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
.inicio-page {
  padding: 56px 40px 56px;
  min-height: calc(100vh - 96px);
  background: linear-gradient(180deg, #f8fbff 0%, #f1f5f9 45%, #ffffff 100%);
  display: flex;
  flex-direction: column;
  gap: 32px;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.welcome-hero-card {
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 24px 40px rgba(15, 23, 42, 0.08);
  border: 1px solid rgba(148, 163, 184, 0.12);
  padding: 48px 56px;
  display: grid;
  grid-template-columns: 1fr 400px; 
  gap: 40px;
  align-items: center;
}

.hero-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.hero-title {
  font-family: 'Poppins', sans-serif;
  font-size: 38px; 
  font-weight: 700;
  color: #0f172a; 
  margin: 0 0 16px;
  line-height: 1.3;
}

.app-name {
  color: #1565c0; 
}

.hero-description {
  font-family: "Poppins", sans-serif;
  font-size: 17px;
  line-height: 1.7;
  color: #64748b; 
  margin: 0 0 32px;
  max-width: 550px;
}

.hero-cta-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  border: none;
  border-radius: 999px; 
  background: linear-gradient(135deg, #2563eb, #1e40af);
  color: #ffffff;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease-out;
  box-shadow: 0 12px 24px rgba(37, 99, 235, 0.22);
}

.hero-cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 32px rgba(37, 99, 235, 0.28);
}

.hero-image img {
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 16px;
  display: block;
}

.quick-access-section {
  margin-top: 16px;
}

.section-title {
  font-family: 'Poppins', sans-serif;
  font-size: 22px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 24px;
}

.quick-access-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.access-card {
  background: #fff;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 20px 32px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: 1px solid rgba(148, 163, 184, 0.12);
  text-decoration: none;
  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
}

.access-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(21, 101, 192, 0.15);
}

.access-card__icon {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}

.access-card__title {
  font-size: 17px;
  margin: 0;
  color: #0f172a;
  font-weight: 600;
}

.access-card__sub {
  margin: 0;
  font-size: 13px;
  color: #64748b;
  line-height: 1.6;
}

@media (max-width: 1024px) {
  .welcome-hero-card {
    grid-template-columns: 1fr; 
    flex-direction: column-reverse;
    padding: 32px 24px;
  }
  .hero-text {
    align-items: center;
    text-align: center;
  }
  .hero-image {
    order: -1; 
    margin-bottom: 24px;
  }
  .hero-image img {
    width: 100%;
    max-width: 350px;
  }
}

@media (min-width: 768px) and (max-width: 1200px) {
  .quick-access-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1201px) {
  .quick-access-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
