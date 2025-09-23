<template>
  <header class="app-header">
    <h1 class="title">{{ titulo }}</h1>
    <img
      class="avatar"
      :src="fotoUsuario || defaultAvatar"
      alt="Usuário"
      width="40"
      height="40"
    />
  </header>
</template>

<script setup>
// Componente de header simples e reutilizável
const props = defineProps({
  titulo: { type: String, default: "" },
  fotoUsuario: { type: String, default: "" },
});

// Avatar padrão embutido (SVG)
const defaultAvatar =
  'data:image/svg+xml;utf8,' +
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">' +
  '<circle cx="20" cy="14" r="8" fill="%23ccc"/>' +
  '<path d="M4 36c0-8 8-12 16-12s16 4 16 12" fill="%23ccc"/>' +
  '</svg>';
</script>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 96px;
  padding: 0 24px;
  /* Gradiente: 40% #1565C0 até 100% #163B66 */
  background: linear-gradient(90deg, #1565C0 40%, #163B66 100%);
  /* Sombra interna aproximada (Y=4px, B=4px) */
  box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.12);
  color: #fff;
  box-sizing: border-box;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1000;
  margin: 0;
}
.title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
}
.avatar {
  border-radius: 50%;
  object-fit: cover;
  background: #f3f4f6;
  border: 2px solid rgba(255, 255, 255, 0.9);
}
</style>
