<template>
  <div class="gestao-demandas">
    <!-- Cabeçalho -->
    <div class="header">
      <div class="title">
        <i class="fi fi-ss-star"></i>
        <h2>Gestão de Demandas</h2>
      </div>
      <div class="icons">
        <i class="fi fi-ss-star icon"></i>
        <i class="fi fi-ss-magnifying-glass icon"></i>
      </div>
    </div>

    <!-- Cards de Status -->
    <div class="status-cards">
      <div class="card pendente">
        <span>+1</span>
        <p>Pendentes</p>
      </div>
      <div class="card andamento">
        <span>+1</span>
        <p>Em andamento</p>
      </div>
      <div class="card concluido">
        <span>+15</span>
        <p>Concluído</p>
      </div>
    </div>

    <!-- Lista de Demandas -->
    <div class="demandas-list">
      <!-- Card 1 -->
      <div class="demanda-card">
        <div class="demanda-info">
          <div class="icon-box">
            <i class="fi fi-ss-user"></i>
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
            <i class="fi fi-ss-user"></i>
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

<style scoped>
.gestao-demandas {
  padding: 20px;
  font-family: 'Poppins', sans-serif;
}

/* Cabeçalho */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}
.title {
  display: flex;
  align-items: center;
  gap: 12px;
}
.title h2 {
  font-size: 26px;
  font-weight: 700;
}
.icons {
  display: flex;
  gap: 15px;
}
.icon {
  font-size: 20px;
  cursor: pointer;
}

/* Cards de Status */
.status-cards {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 30px auto;
  max-width: 1000px;
}
.card {
  width: 306px;
  height: 184px;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  font-weight: 600;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.card span {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 8px;
}
.card.pendente { background: #ffcc80; }
.card.andamento { background: #90caf9; }
.card.concluido { background: #a5d6a7; }

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

/* Informações */
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

/* Ações */
.actions {
  position: absolute;
  right: 20px;
  bottom: 15px;
  display: flex;
  gap: 15px;
}
.action-icon {
  font-size: 20px;
  color: #37474f;
  cursor: pointer;
}
</style>
