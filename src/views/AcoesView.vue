<template>
  <div class="acoes">
    <h1>Ações</h1>

    <!-- Imagem cinza no lugar do mapa -->
    <div class="map-placeholder">[Mapa aqui futuramente]</div>

    <!-- Botão para cadastro -->
    <button @click="$router.push('/cadastrar-acao')" class="nova-acao">
      + Nova Ação
    </button>
  </div>
</template>

<style scoped>
.map-placeholder {
  background: #ddd;
  width: 100%;
  height: 300px;
  border-radius: 10px;
  margin-bottom: 20px;
}
.nova-acao {
  background: #1565c0;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
}
</style>
