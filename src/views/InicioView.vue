<template>
  <div class="inicio-container">
    <div class="content-area">
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
// Nada a importar aqui; sidebar vem de App.vue
</script>

<style scoped>
.inicio-container { display: block; }

.content-area {
  max-width: 1120px; /* centraliza horizontalmente */
  margin: 0 auto;
  padding: 0 24px;
  /* Centralização vertical relativa à viewport menos a altura do header */
  min-height: calc(100vh - 96px);
  display: flex;
  align-items: center; /* centra verticalmente o .main-area */
}

.main-area {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  width: 100%;
  /* desloca o bloco cerca de 2cm para baixo */
  transform: translateY(2cm);
}

.text-section {
  flex: 1 1 50%;
  max-width: 540px;
}

.app-name {
  font-family: 'Inter', sans-serif;
  font-size: 48px;
  font-weight: 800;
  color: #000;
  margin-bottom: 20px;
}

.app-description {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 28px;
  color: #555;
  text-align: justify;
}

.image-placeholder {
  flex: 1 1 50%;
  max-width: 560px;
  height: 420px;
  background-color: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Inter', sans-serif;
  font-size: 36px;
  font-weight: 700;
  color: #aaa;
  border-radius: 12px;
}

@media (max-width: 1024px) {
  .main-area { flex-direction: column; align-items: flex-start; }
  .image-placeholder { width: 100%; max-width: none; height: 320px; }
  .text-section { max-width: none; }
}
</style>
