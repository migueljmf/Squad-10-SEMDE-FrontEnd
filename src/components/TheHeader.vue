<template>
  <header class="app-header">
    <h1 class="title">{{ titulo }}</h1>
    <RouterLink
      to="/perfil"
      class="avatar-link"
      aria-label="Abrir perfil do usuario"
    >
      <img
        class="avatar"
        :src="fotoUsuario || defaultAvatar"
        alt="Perfil do usuario"
        width="40"
        height="40"
      />
    </RouterLink>
  </header>
</template>

<script setup>
import { RouterLink } from "vue-router";

// Componente de header simples e reutilizavel
const props = defineProps({
  titulo: { type: String, default: "" },
  fotoUsuario: { type: String, default: "" },
});

// Avatar padrao embutido (SVG)
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
  background: linear-gradient(90deg, #1565c0 40%, #163b66 100%);
  box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.12);
  color: #fff;
  box-sizing: border-box;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1000;
  margin: 0;
}

.avatar-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  text-decoration: none;
  outline: none;
  transition: transform 0.2s ease;
}

.avatar-link:hover {
  transform: scale(1.05);
}

.avatar-link:focus-visible {
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.45);
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
