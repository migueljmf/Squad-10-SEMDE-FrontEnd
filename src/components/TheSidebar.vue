<template>
  <aside class="sidebar">
    <nav class="sidebar-nav">
      <ul>
        <li 
        v-for="item in menuItems.filter(i => can(i.roles))"
          :key="item.to">

          <RouterLink :to="item.to">
            <mdicon :name="item.icon" :size="24" />
            <span>{{ item.label }}</span>
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
import { RouterLink, useRouter } from "vue-router";
import { logout, getUser, hasRole } from "../auth/auth.js";

const router = useRouter();
const can = hasRole;

const menuItems = [
  {
    label: "Início",
    icon: "home",
    to: "/inicio",
    roles: ["ADMIN", "PARLIAMENTARY", "ADVISOR"]
  },
  {
    label: "Dashboard",
    icon: "view-dashboard",
    to: "/dashboard",
    roles: ["ADMIN", "PARLIAMENTARY", "ADVISOR"]
  },
  {
    label: "Gestão de demandas",
    icon: "clipboard-list",
    to: "/gestao-demandas",
    roles: ["ADMIN", "PARLIAMENTARY", "ADVISOR"]
  },
  {
    label: "Ações",
    icon: "account-group",
    to: "/acoes",
    roles: ["ADMIN", "PARLIAMENTARY"]
  },
  {
    label: "Tarefas",
    icon: "checkbox-marked",
    to: "/tarefas",
    roles: ["ADMIN", "PARLIAMENTARY", "ADVISOR"]
  },
  {
    label: "Financeiro",
    icon: "finance",
    to: "/financeiro",
    roles: ["ADMIN", "PARLIAMENTARY"]
  },
  {
    label: "Eleições",
    icon: "vote",
    to: "/eleicoes",
    roles: ["ADMIN", "PARLIAMENTARY"]
  },
  {
    label: "Configurações",
    icon: "cog",
    to: "/configuracoes",
    roles: ["ADMIN", "PARLIAMENTARY", "ADVISOR"]
  },
  {
    label: "Agente IA",
    icon: "robot",
    to: "/agente-ia",
    roles: ["PARLIAMENTARY"]
  }
];
const onLogout = () => {
  logout();
  router.push("/login");
};

</script>

<style scoped>
.sidebar {
  background-color: #1565C0;
  color: #ffffff;
  width: 264px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px 15px;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  position: fixed;
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
