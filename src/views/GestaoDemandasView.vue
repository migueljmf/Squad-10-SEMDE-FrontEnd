<template>
  <div class="gestao-demandas">
    <div class="header">
      <div class="title">
        <div class="title-icon">
          <mdicon name="clipboard-list" :size="28" />
        </div>
        <h2>Gestão de Demandas</h2>
      </div>
    </div>

    <div class="utility-icons">
      <span class="icon-svg icon-star" role="img" aria-label="Favoritos">
        <svg xmlns="http://www.w3.org/2000/svg" width="28.146" height="27.06" viewBox="0 0 28 28" fill="none">
          <path d="M22.7118 27.2011L14.0003 20.7984L5.28876 27.2011L8.63359 16.8609L-0.0732422 10.4991H10.6764L14.0003 0.141388L17.3241 10.4991H28.0726L19.3669 16.8609L22.7118 27.2011Z" fill="#374957" />
        </svg>
      </span>
      <span class="icon-svg icon-search" role="img" aria-label="Buscar">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M27.4877 25.0196L22.0683 19.598C26.1233 14.1791 25.0177 6.49891 19.5988 2.4439C14.1799 -1.6111 6.4997 -0.505436 2.4447 4.91347C-1.61031 10.3324 -0.504643 18.0125 4.91426 22.0675C9.26717 25.3249 15.2458 25.3249 19.5988 22.0675L25.0204 27.4892C25.7017 28.1705 26.8064 28.1705 27.4876 27.4892C28.1689 26.8078 28.1689 25.7032 27.4876 25.0219L27.4877 25.0196ZM12.3017 21.0211C7.48563 21.0211 3.58149 17.117 3.58149 12.3009C3.58149 7.48484 7.48563 3.58069 12.3017 3.58069C17.1178 3.58069 21.0219 7.48484 21.0219 12.3009C21.0168 17.1148 17.1156 21.016 12.3017 21.0211Z" fill="#374957" />
        </svg>
      </span>
    </div>

    <section class="status-cards">
      <div class="card pendente">
        <span class="count-badge">+1</span>
        <p class="card-title">Pendentes</p>
      </div>
      <div class="card andamento">
        <span class="count-badge">+1</span>
        <p class="card-title">Em andamento</p>
      </div>
      <div class="card concluido">
        <span class="count-badge">+15</span>
        <p class="card-title">Concluído</p>
      </div>
    </section>

    <section class="demandas-list">
      <article
        v-for="demanda in demandas"
        :key="demanda.titulo"
        class="demanda-card"
      >
        <span
          class="badge badge-type"
          :class="['type-' + demanda.tipoClass]"
        >
          <mdicon :name="demanda.icon" :size="20" class="badge-icon" />
          {{ demanda.tipo }}
        </span>
        <span
          class="badge badge-status"
          :class="['status-' + demanda.statusClass]"
        >
          {{ demanda.status }}
        </span>

        <h3 class="demanda-title">{{ demanda.titulo }}</h3>
        <p class="demanda-description">{{ demanda.descricao }}</p>

        <div class="demanda-meta">
          <i class="fi fi-ss-marker"></i>
          <span>{{ demanda.bairro }}</span>
          <span class="meta-separator">|</span>
          <span>{{ demanda.data }}</span>
        </div>

        <div class="card-actions">
          <button type="button" class="action-button" aria-label="Editar">
            <img :src="iconEdit" alt="Editar" />
          </button>
          <button type="button" class="action-button" aria-label="Excluir">
            <img :src="iconTrash" alt="Excluir" />
          </button>
          <button type="button" class="action-button" aria-label="Favoritar">
            <img :src="iconFavorite" alt="Favoritar" />
          </button>
        </div>
      </article>
    </section>
  </div>
</template>

<script setup>
import iconEdit from '@/assets/fi-ss-pencil.svg?url';
import iconTrash from '@/assets/fi-ss-trash.svg?url';
import iconFavorite from '@/assets/fi-ss-heart.svg?url';
import mdicon from 'mdi-vue/v3';

const demandas = [
  {
    titulo: 'Praça do centro',
    descricao: 'Reformar uma praça',
    bairro: 'Bairro centro',
    data: '04/09/2025',
    status: 'Pendentes',
    statusClass: 'pendente',
    tipo: 'Tarefa',
    tipoClass: 'tarefa',
    icon: 'clipboard-text-outline',
  },
  {
    titulo: 'Buraco na rua A',
    descricao: 'Obra de recapeamento',
    bairro: 'Bairro Siqueira Campos',
    data: '15/08/2025',
    status: 'Em andamento',
    statusClass: 'andamento',
    tipo: 'Ação',
    tipoClass: 'acao',
    icon: 'target',
  },
];
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=K2D:wght@400&display=swap');

.gestao-demandas {
  padding: 20px 24px 48px;
  font-family: 'Poppins', sans-serif;
  color: #000;
  background: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.title-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1565c0 0%, #163b66 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;
}

.utility-icons {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-bottom: 32px;
}

.icon-svg {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #fddc9c;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.status-cards {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin: 0 auto 48px;
  max-width: 1000px;
  width: 100%;
}

.card {
  width: 306px;
  height: 184px;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 24px 32px;
  font-family: 'Poppins', sans-serif;
}

.card .count-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-weight: 600;
}

.card .card-title {
  font-size: 22px;
  font-weight: 600;
  margin: 0;
}

.card.pendente {
  background: #fddc9c;
}

.card.pendente .count-badge {
  background: #fba441;
  color: #374957;
}

.card.andamento {
  background: #c5e1fa;
}

.card.andamento .count-badge {
  background: #1e88e5;
  color: #fff;
}

.card.concluido {
  background: #c8e6c9;
}

.card.concluido .count-badge {
  background: #43a047;
  color: #fff;
}

.demandas-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
}

.demanda-card {
  position: relative;
  width: 100%;
  max-width: 1000px;
  height: 191px;
  border-radius: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  font-family: 'Poppins', sans-serif;
}

.badge {
  position: absolute;
  top: 22px;
  min-width: 135px;
  height: 37px;
  padding: 0 16px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  font-size: 18px;
  line-height: 24px;
  font-weight: 500;
}

.badge-icon {
  display: inline-flex;
  align-items: center;
  margin-right: 8px;
}

.badge-type {
  right: 186px;
  background-color: #a8ffb8;
  color: #000;
}

.badge-type.type-acao {
  background: #ce93d8;
}

.badge-status {
  right: 12px;
  background-color: #fddc9c;
  color: #fba441;
}

.badge-status.status-andamento {
  background: #90caf9;
  color: #1565c0;
}

.badge-status.status-concluido {
  background: #c8e6c9;
  color: #2e7d32;
}

.demanda-title {
  position: absolute;
  top: 30px;
  left: 40px;
  font-family: 'Inter', sans-serif;
  font-size: 32px;
  font-weight: 700;
  margin: 0;
}

.demanda-description {
  position: absolute;
  top: 84px;
  left: 40px;
  font-family: 'K2D', sans-serif;
  font-size: 20px;
  color: #525252;
  margin: 0;
}

.demanda-meta {
  position: absolute;
  top: 134px;
  left: 40px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #9c9c9c;
}

.demanda-meta .fi {
  font-size: 20px;
  color: #1565c0;
}

.meta-separator {
  color: #9c9c9c;
}

.card-actions {
  position: absolute;
  right: 20px;
  bottom: 16px;
  display: flex;
  gap: 12px;
}

.action-button {
  width: 44px;
  height: 44px;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.action-button img {
  width: 28px;
  height: 28px;
  object-fit: contain;
  transition: transform 0.2s ease;
}

.action-button:hover img {
  transform: scale(1.05);
}

@media (max-width: 1100px) {
  .badge-type {
    right: 50%;
    transform: translateX(120%);
  }

  .badge-status {
    right: 24px;
  }
}

@media (max-width: 768px) {
  .status-cards {
    flex-direction: column;
    align-items: center;
  }

  .demanda-card {
    height: auto;
    padding: 120px 24px 80px;
  }

  .badge {
    position: static;
    margin-top: 16px;
  }

  .demanda-title,
  .demanda-description,
  .demanda-meta,
  .card-actions {
    position: static;
    transform: none;
  }

  .demanda-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .card-actions {
    align-self: flex-end;
  }

  .action-button {
    width: 36px;
    height: 36px;
  }

  .action-button img {
    width: 20px;
    height: 20px;
  }
}
</style>
