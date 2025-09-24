<template>
  <div class="gestao-demandas">
    <!-- CabeÃ§alho -->
    <div class="header">
      <div class="title">
        <div class="title-icon">
          <i class="fi fi-ss-user"></i>
        </div>
        <h2>GestÃ£o de Demandas</h2>
      </div>
    </div>

    <!-- Ãcones utilitÃ¡rios abaixo do cabeÃ§alho, agrupados em cÃ­rculo amarelo no canto superior direito -->
    <div class="utility-icons">
      <span class="icon-svg icon-star" role="img" aria-label="Favoritos">
        <svg xmlns="http://www.w3.org/2000/svg" width="28.146" height="27.06" viewBox="0 0 28 28" fill="none">
          <path d="M22.7118 27.2011L14.0003 20.7984L5.28876 27.2011L8.63359 16.8609L-0.0732422 10.4991H10.6764L14.0003 0.141388L17.3241 10.4991H28.0726L19.3669 16.8609L22.7118 27.2011Z" fill="#374957"/>
        </svg>
      </span>
      <span class="icon-svg icon-search" role="img" aria-label="Buscar">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M27.4877 25.0196L22.0683 19.598C26.1233 14.1791 25.0177 6.49891 19.5988 2.4439C14.1799 -1.6111 6.4997 -0.505436 2.4447 4.91347C-1.61031 10.3324 -0.504643 18.0125 4.91426 22.0675C9.26717 25.3249 15.2458 25.3249 19.5988 22.0675L25.0204 27.4892C25.7017 28.1705 26.8064 28.1705 27.4876 27.4892C28.1689 26.8078 28.1689 25.7032 27.4876 25.0219L27.4877 25.0196ZM12.3017 21.0211C7.48563 21.0211 3.58149 17.117 3.58149 12.3009C3.58149 7.48484 7.48563 3.58069 12.3017 3.58069C17.1178 3.58069 21.0219 7.48484 21.0219 12.3009C21.0168 17.1148 17.1156 21.016 12.3017 21.0211Z" fill="#374957"/>
        </svg>
      </span>
    </div>

    <!-- Cards de Status -->
    <div class="status-cards">
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
        <p class="card-title">ConcluÃ­do</p>
      </div>
    </div>

    <!-- Lista dee Demandas -->
    <div class="demandas-list">
      <!-- Card 1 -->
      <div class="demanda-card">
        <div class="demanda-info">
          <div class="icon-box">
            <i class="fi fi-ss-user"></i>
          </div>
          <div class="text-info">
            <h3>PraÃ§a do centro</h3>
            <p>Reformar uma praÃ§a</p>
            <div class="meta">
              <i class="fi fi-ss-marker"></i>
              <span>Bairro centro</span>
              <span class="separator">|</span>
              <span>04/09/2025</span>
            </div>
          </div>
        </div>
        <div class="tags">
          <span class="tag tarefa">Tarefa</span>
          <span class="tag pendente">Pendentes</span>
        </div>
        <div class="actions">
          <i class="fi fi-ss-pencil action-icon"></i>
          <i class="fi fi-ss-trash action-icon"></i>
          <i class="fi fi-ss-star action-icon"></i>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="demanda-card">
        <div class="demanda-info">
          <div class="icon-box">
            <i class="fi fi-ss-user"></i>
          </div>
          <div class="text-info">
            <h3>Buraco na rua A</h3>
            <p>Reformar uma praÃ§a</p>
            <div class="meta">
              <i class="fi fi-ss-marker"></i>
              <span>Bairro Siqueira Campos</span>
              <span class="separator">|</span>
              <span>15/08/2025</span>
            </div>
          </div>
        </div>
        <div class="tags">
          <span class="tag acao">AÃ§Ã£o</span>
          <span class="tag andamento">Em andamento</span>
        </div>
        <div class="actions">
          <i class="fi fi-ss-pencil action-icon"></i>
          <i class="fi fi-ss-trash action-icon"></i>
          <i class="fi fi-ss-star action-icon"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gestao-demandas {
  padding: 20px 24px;
  font-family: 'Poppins', sans-serif;
}

/* CabeÃ§alho */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.title {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* 
  Grupo dos Ã­cones utilitÃ¡rios (estrela e lupa)
*/
.utility-icons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 72px;
  height: 72px;;
  margin: 30px 70px 25px auto; 
}

/* Ãcone de estrela */
.icon-star {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: #374957;
}

/* Ãcone de lupa */
.icon-search {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: #374957;
}

/* Cards de Status */
.status-cards {
  display: flex;
  gap: 70px;
  margin: 45px 300px 40px; /*posiÃ§Ã£o centralizada*/
  max-width: 1000px;
  width: 100%;
}
.card {
  width: 600px;
  height: 180px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.37);
  font-weight: 600;
  text-align: center; /* centraliza conteÃºdo textual */
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center; /* alinha itens ao centro horizontalmente */
  position: relative;
  padding-bottom: 20px;
}
.count-badge {
  position: absolute;
  top: 16px;
  left: 15%; /* centraliza o selo no topo */
  transform: translateX(-50%);
  width: 43px;
  height: 43px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 800;
  color: #fff;
  background: #1E88E5; /* padrÃ£o azul */
}
.card-title {
  margin: 0; /* tÃ­tulo fixo na parte inferior do card */
  color: var(--Greys-Blue-Grey-900, #151D48);
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 600; /* Semibold */
  line-height: 32px; /* 133.333% */
}
.card.pendente { background: #ffcc80; }
.card.pendente .count-badge { background: #FBA441; }
.card.andamento { background: #90caf9; }
.card.concluido { background: #a5d6a7; }
.card.concluido .count-badge { background: #00C853; }

/* Lista de Demandas */
.demandas-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.demanda-card {
  width: 1003px;
  height: 191px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  padding: 20px 25px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 0 auto;
  position: relative;
}

/* InformaÃ§Ãµes */
.demanda-info {
  display: flex;
  gap: 15px;
}
.icon-box {
  background: #1565c0;
  color: white;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.text-info h3 {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
}
.text-info p {
  font-size: 14px;
  margin: 2px 0 8px;
}
.meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #666;
}
.separator {
  color: #999;
}

/* Tags */
.tags {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}
.tag {
  padding: 6px 15px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
}
.tag.tarefa { background: #A8FFB8; }
.tag.acao { background: #ce93d8; }
.tag.pendente { background: #ffe0b2; }
.tag.andamento { background: #90caf9; }
.tag.concluido { background: #c8e6c9; }

/* AÃ§Ãµes */
.actions {
  position: absolute;
  right: 20px;
  bottom: 15px;
  display: flex;
  gap: 15px;
}
.action-icon {
  font-size: 100px;
  color: #37474f;
  cursor: pointer;
}
/* ------ Overrides para os Cards de Status ------ */
.status-cards {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin: 32px auto;
  max-width: 1000px;
  width: 100%;
}
.card {
  width: 306px;
  height: 184px;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.12);
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  padding-bottom: 0;
}
.count-badge {
  top: 16px;
  left: 16px;
  transform: none;
  width: 44px;
  height: 44px;
}
.card-title {
  position: absolute;
  left: 31px;
  bottom: 30px;
  margin: 0;
}
.card.pendente { background: #FDDC9C; }
.card.pendente .count-badge { background: #FBA441; color: #374957; }
.card.andamento { background: #C5E1FA; }
.card.andamento .count-badge { background: #1E88E5; }
.card.concluido { background: #C8E6C9; }
</style>


