<template>
  <div class="inicio-container">
    <TheSidebar />
    <div class="content-area">
      <h1 class="page-title">Início</h1>
      <div class="main-area">
        <div class="text-section">
          <h2 class="app-name">CRM POLÍTICO</h2>
          <p class="app-description">
            O CRM é um sistema de gestão política em desenvolvimento, com foco em
            otimizar a organização, a comunicação e as campanhas eleitorais. Ele
            inclui funcionalidades como análise de dados, criação de tarefas e
            acompanhamento de ações, ajudando a equipe a gerenciar de forma
            eficiente suas atividades.
          </p>
        </div>
        <div class="image-placeholder">
          <span>IMAGEM ILUSTRATIVA</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TheSidebar from '../components/TheSidebar.vue';
</script>

<style scoped>
.page-title {
  font-family: 'Poppins', sans-serif;
  font-size: 30px;
  font-weight: 600;
  color: #333;
  margin-top: 0; /* Garante que o título comece no topo */
  margin-bottom: 60px; /* Espaço entre o título e o conteúdo abaixo */
}

.inicio-container {
  display: flex;
}

.content-area {
  flex: 1;
  padding-left: 20px;
}

.main-area {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.text-section {
  flex: 1;
  max-width: 480px; 
}

.app-name {
  font-family: 'Inter', sans-serif;
  font-size: 40px;
  font-weight: 600;
  color: #000;
  margin-bottom: 20px;
}

.app-description {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 24px;
  color: #555;
  text-align: justify;
}

.image-placeholder {
  flex: 1;
  max-width: 500px;
  height: 450px;
  background-color: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Inter', sans-serif;
  font-size: 40px;
  font-weight: 600;
  color: #aaa;
  border-radius: 8px;
}
</style>