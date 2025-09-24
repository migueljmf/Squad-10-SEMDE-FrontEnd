<template>
  <div class="gestao-demandas">
    <!-- Cabeçalho -->
    <div class="header">
      <div class="title">
        <div class="title-icon">
          <i class="fi fi-ss-user"></i>
        </div>
        <h2>Gestão de Demandas</h2>
      </div>
    </div>

    <!-- Ícones utilitários abaixo do cabeçalho, agrupados em círculo amarelo no canto superior direito -->
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
        <p class="card-title">Concluído</p>
      </div>
    </div>

    <!-- Lista de Demandas -->
    <div class="demandas-list">
      <!-- Card 1 -->
      <div class="demanda-card">
        <div class="demanda-info">
          <div class="icon-box">
            <img :class="$style.userIcon" :src="userIconSvg" alt="Usuário" />
          </div>
          <div class="text-info">
            <h3>Praça do centro</h3>
            <p>Reformar uma praça</p>
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
            <img :class="$style.userIcon" :src="userIconSvg" alt="Usuário" />
          </div>
          <div class="text-info">
            <h3>Buraco na rua A</h3>
            <p>Reformar uma praça</p>
            <div class="meta">
              <i class="fi fi-ss-marker"></i>
              <span>Bairro Siqueira Campos</span>
              <span class="separator">|</span>
              <span>15/08/2025</span>
            </div>
          </div>
        </div>
        <div class="tags">
          <span class="tag acao">Ação</span>
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

<script setup>
const userIconSvg =
  'data:image/svg+xml;utf8,' +
  `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="20" viewBox="0 0 28 20" fill="none">
     <path d="M13.938 13.0974C18.1228 13.0974 21.6961 13.7609 21.6961 16.4158C21.6961 19.0696 18.1457 19.7572 13.938 19.7572C9.75312 19.7572 6.17985 19.0937 6.17985 16.44C6.17985 13.7851 9.73019 13.0974 13.938 13.0974ZM20.629 11.4988C22.2289 11.4691 23.9489 11.6888 24.5845 11.8448C25.9311 12.1095 26.8167 12.6499 27.1837 13.4353C27.4938 14.0801 27.4938 14.8281 27.1837 15.4718C26.6223 16.69 24.8128 17.081 24.1095 17.182C23.9642 17.204 23.8474 17.0777 23.8627 16.9316C24.222 13.5561 21.364 11.9557 20.6246 11.5878C20.593 11.5713 20.5864 11.546 20.5897 11.5307C20.5919 11.5197 20.605 11.5021 20.629 11.4988ZM7.07079 11.4965L7.37207 11.4992C7.39609 11.5025 7.40811 11.5201 7.41029 11.53C7.41357 11.5465 7.40701 11.5706 7.37644 11.5882C6.63601 11.9562 3.77804 13.5566 4.13733 16.9309C4.15262 17.0781 4.03686 17.2034 3.89162 17.1825C3.18832 17.0814 1.37874 16.6904 0.817416 15.4722C0.506174 14.8275 0.506174 14.0805 0.817416 13.4358C1.18435 12.6504 2.06894 12.11 3.41547 11.8441C4.05215 11.6893 5.77108 11.4696 7.37207 11.4992L7.07079 11.4965ZM13.938 0.242798C16.7872 0.242798 19.0718 2.53851 19.0718 5.4054C19.0718 8.27119 16.7872 10.5691 13.938 10.5691C11.0887 10.5691 8.80411 8.27119 8.80411 5.4054C8.80411 2.53851 11.0887 0.242798 13.938 0.242798ZM20.9075 1.10374C23.6595 1.10374 25.8208 3.70811 25.0847 6.60905C24.5878 8.56205 22.7891 9.85929 20.7852 9.80656C20.5842 9.80107 20.3866 9.7824 20.1955 9.74945C20.0568 9.72528 19.9869 9.56821 20.0655 9.45177C20.83 8.3204 21.2657 6.95945 21.2657 5.49854C21.2657 3.97393 20.7896 2.55257 19.9629 1.38714C19.9366 1.35089 19.917 1.29487 19.9432 1.25313C19.965 1.21908 20.0054 1.2015 20.0437 1.19272C20.3221 1.1356 20.6083 1.10374 20.9075 1.10374ZM7.09195 1.10363C7.39118 1.10363 7.6773 1.13549 7.95688 1.19261C7.99401 1.20139 8.0355 1.22007 8.05735 1.25302C8.08246 1.29476 8.0639 1.35078 8.03769 1.38703C7.21099 2.55246 6.73484 3.97382 6.73484 5.49843C6.73484 6.95934 7.17058 8.32029 7.93503 9.45166C8.01366 9.5681 7.94377 9.72517 7.80508 9.74934C7.61287 9.78339 7.4163 9.80096 7.21535 9.80645C5.21139 9.85918 3.41274 8.56194 2.91584 6.60894C2.17869 3.708 4.33991 1.10363 7.09195 1.10363Z" fill="white"/>
   </svg>`;
</script>

<style scoped>
.gestao-demandas { padding: 20px 24px; font-family: "Poppins", sans-serif; }

/* Cabe�alho */
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.title { display: flex; align-items: center; gap: 12px; }

/* �cones utilit�rios (c�rculo amarelo) */
.utility-icons { display: flex; align-items: center; gap: 12px; margin: 6px 12px 14px auto; }

/* Cards de Status */
.status-cards { display: flex; justify-content: center; gap: 24px; margin: 32px auto; max-width: 1000px; width: 100%; }
.card { width: 306px; height: 184px; border-radius: 16px; box-shadow: 0 4px 10px rgba(0,0,0,0.12); font-weight: 600; text-align: left; display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start; position: relative; }
.count-badge { position: absolute; top: 16px; left: 16px; width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 800; color: #fff; background: #1E88E5; }
.card-title { position: absolute; left: 31px; bottom: 30px; margin: 0; color: var(--Greys-Blue-Grey-900, #151D48); font-family: "Poppins", sans-serif; font-size: 24px; font-weight: 600; line-height: 32px; }
.card.pendente { background: #FDDC9C; }
.card.pendente .count-badge { background: #FBA441; color: #374957; }
.card.andamento { background: #C5E1FA; }
.card.andamento .count-badge { background: #1E88E5; }
.card.concluido { background: #C8E6C9; }
.card.concluido .count-badge { background: #00C853; }

/* Lista de Demandas */
.demandas-list { display: flex; flex-direction: column; gap: 24px; margin: 16px 0 32px; }
.demanda-card { width: 1003px; height: 191px; background: #F9F9F9; border-radius: 20px; box-shadow: 0 4px 0 rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.06); padding: 24px 28px; display: flex; justify-content: space-between; align-items: flex-start; margin: 0 auto; position: relative; box-sizing: border-box; }
.demanda-info { display: flex; gap: 16px; }
.icon-box { width: 44px; height: 44px; background: #1565C0; color: #fff; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
.text-info h3 { font-size: 24px; font-weight: 800; margin: 0 0 6px 0; color: #000; }
.text-info p { font-size: 16px; margin: 0 0 12px; color: #6B7280; }
.meta { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #9AA3AF; }
.separator { color: #999; }
.tags { position: absolute; top: 20px; right: 24px; display: flex; gap: 10px; }
.tag { padding: 6px 14px; border-radius: 9999px; font-size: 13px; font-weight: 600; line-height: 1; }
.tag.tarefa { background: #DFF5E1; color: #2E7D32; }
.tag.acao { background: #E5D4F3; color: #6A1B9A; }
.tag.pendente { background: #FDDC9C; color: #8C5A06; }
.tag.andamento { background: #C5E1FA; color: #1E88E5; }
.tag.concluido { background: #C8E6C9; color: #2E7D32; }
.actions { position: absolute; right: 24px; bottom: 16px; display: flex; gap: 18px; }
.action-icon { font-size: 20px; color: #374957; cursor: pointer; }
/* Tamanho fixo para os SVGs dos ícones utilitários */
.icon-svg { display: flex; width: 28px; height: 28px; padding: 0 0.001px; justify-content: center; align-items: center; flex-shrink: 0; }
</style>
<style module>
.userIcon {
  width: 26.832px;
  height: 19.514px;
  flex-shrink: 0;
  display: block;
}
</style>

<style>
body {
  margin: 0;
  line-height: normal;
}
</style>











