<template>
  <aside class="sidebar">
    <nav class="sidebar-nav">
      <ul>
        <li>
          <RouterLink to="/inicio">
            <mdicon name="home" :size="24" />
            <span>Início</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/dashboard">
            <mdicon name="view-dashboard" :size="24" />
            <span>Dashboard</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/gestao-demandas">
            <mdicon name="clipboard-list" :size="24" />
            <span>Gestão de demandas</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/acoes">
            <mdicon name="account-group" :size="24" />
            <span>Ações</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/tarefas">
            <mdicon name="checkbox-marked" :size="24" />
            <span>Tarefas</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/financeiro">
            <mdicon name="finance" :size="24" />
            <span>Financeiro</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/eleicoes">
            <mdicon name="vote" :size="24" />
            <span>Eleições</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/configuracoes">
            <mdicon name="cog" :size="24" />
            <span>Configurações</span>
          </RouterLink>
        </li>
      </ul>
    </nav>
    <div class="sidebar-logout">
      <button class="logout-button" @click="onLogout" type="button">
        <mdicon name="logout" :size="24" />
        <span>Logout</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router'
import mdicon from 'mdi-vue/v3'

const router = useRouter()
const onLogout = () => {
  // Se houver lógica de sessão futuramente, limpe aqui.
  router.push('/login')
}
</script>

<style scoped>
.sidebar {
  background-color: #1565C0;
  color: #ffffff;
  width: 260px; /* ajustei p/ encaixar melhor */
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px 15px;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
  position: fixed; /* fixa no lado esquerdo */
  left: 0;
  top: 0;
}
.sidebar-nav {
  flex-grow: 1;
}
.sidebar-nav ul {
  list-style: none;
  padding: 0;
}
li a {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px 15px;
  text-decoration: none;
  color: #E0E0E0;
  font-size: 1rem;
  transition: background-color 0.2s;
  border-radius: 8px;
  margin-bottom: 5px;
}
li a:hover {
  background-color: #5998DF;
  color: #ffffff;
}
li a.router-link-exact-active {
  background-color: #5998DF; 
  color: #ffffff;
  font-weight: 600;
}
.sidebar-logout {
  margin-top: auto;
}
.logout-button {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px 15px;
  background-color: #3B6FB8;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  text-align: left;
}
.logout-button:hover {
  background-color: #505c70;
}
</style>
