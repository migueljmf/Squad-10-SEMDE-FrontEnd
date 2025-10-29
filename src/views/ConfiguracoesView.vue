<template>
  <div class="configuracoes">
    <PageHero
      title="Configurações"
      description="Gerencie as preferências do mandato, defina permissões e personalize notificações para manter a equipe alinhada."
    />

    <section class="configuracoes-cards">
      <article
        v-for="card in cards"
        :key="card.title"
        class="configuracoes-card"
      >
        <header class="configuracoes-card__header">
          <h2>{{ card.title }}</h2>
        </header>
        <p class="configuracoes-card__description">
          {{ card.description }}
        </p>
        <RouterLink
          class="configuracoes-card__button"
          :to="card.to"
        >
          {{ card.buttonLabel }}
        </RouterLink>
      </article>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import PageHero from "@/components/PageHero.vue";

const cards = [
  {
    title: "Alteração de senha",
    description:
      "Atualize a credencial principal do mandato e mantenha o acesso protegido.",
    buttonLabel: "Gerenciar senha",
    to: "/configuracoes/senha",
  },
  {
    title: "Cadastro de usuários",
    description:
      "Inclua novos membros e defina os níveis de permissão adequados.",
    buttonLabel: "Cadastrar usuário",
    to: "/configuracoes/cadastro",
  },
  {
    title: "Administração de usuários",
    description:
      "Acompanhe status, papéis e acesse rapidamente os ajustes de cada membro.",
    buttonLabel: "Ver usuários",
    to: "/configuracoes/usuarios",
  },
];
</script>

<style scoped>
.configuracoes {
  min-height: 100vh;
  padding: 48px 32px 56px;
  background: linear-gradient(180deg, #f8fbff 0%, #f1f5f9 45%, #ffffff 100%);
  display: flex;
  flex-direction: column;
  gap: 32px;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.configuracoes-cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.configuracoes-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 16px 36px rgba(11, 33, 78, 0.12);
  border: 1px solid rgba(20, 56, 126, 0.08);
  display: flex;
  flex-direction: column;
  gap: 18px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.configuracoes-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 22px 46px rgba(11, 33, 78, 0.18);
}

.configuracoes-card__header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #1b2a4b;
}

.configuracoes-card__description {
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  color: #445063;
}

.configuracoes-card__button {
  align-self: flex-start;
  padding: 12px 22px;
  background: linear-gradient(135deg, #2a6bff, #1542da);
  color: #ffffff;
  border: none;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 14px 32px rgba(36, 84, 255, 0.28);
}

.configuracoes-card__button:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 38px rgba(36, 84, 255, 0.36);
}

@media (max-width: 1024px) {
  .configuracoes {
    padding: 32px 24px 40px;
  }

  .configuracoes-cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .configuracoes {
    padding: 24px 16px 36px;
  }

  .configuracoes-cards {
    grid-template-columns: 1fr;
  }

  .configuracoes-card {
    padding: 24px;
  }

  .configuracoes-card__button {
    width: 100%;
    text-align: center;
  }
}
</style>
