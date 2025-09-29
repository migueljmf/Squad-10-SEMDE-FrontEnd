<template>
  <div class="inicio-container">
    <div class="content-area">
      <div class="main-area">
        <div class="text-section">
          <h2 class="app-name">Mandatuum</h2>
          <p class="app-description">
            O Mandatuum é um sistema de gestão política em desenvolvimento, com foco em
            otimizar a organização, a comunicação e as campanhas eleitorais. Ele
            inclui funcionalidades como análise de dados, criação de tarefas e
            acompanhamento de ações, ajudando a equipe a gerenciar de forma
            eficiente suas atividades.
          </p>
        </div>
        <div class="image-placeholder">
          <img src="../assets/img/Mandatuum.png" alt="">
        </div>
      </div>
    </div>
  </div>
 </template>

<script setup>
// Nada a importar aqui; sidebar vem de App.vue
</script>

<style scoped>

body{
  overflow: hidden;
}

.inicio-container {
  /* Ocupa a tela inteira e centraliza seu conteúdo */
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* Impede qualquer barra de rolagem */
}

.content-area {
  max-width: 1120px;
  width: 100%;
  margin: 0 auto;
  padding: 0 24px;
  display: flex; /* Necessário para alinhar o .main-area */
  align-items: center;
}

.main-area {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  width: 100%;
  /* A linha 'transform' foi removida daqui */
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

img {
  width: 500px;
  height: auto;
  border-radius: 16px;
  display: block; /* Ajuda a evitar espaços extras inesperados */
}

@media (max-width: 1024px) {
  .main-area {
    flex-direction: column;
    align-items: center; /* Centraliza na vertical em telas menores */
    text-align: center; /* Centraliza o texto */
  }
  .text-section {
    max-width: none;
  }
}
</style>
