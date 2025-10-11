<template>
  <div class="financeiro-page">
    <section class="hero">
      <div class="hero-text">
        <h1>Centro financeiro</h1>
        <p>
          Acompanhe o fluxo de entradas e saídas do mandato em um só lugar.
          Cadastre movimentações e mantenha a equipe informada sobre os recursos disponíveis.
        </p>
      </div>
      <div class="saldo-card">
        <span class="saldo-label">Saldo disponível</span>
        <strong class="saldo-valor">R$ 12.450,00</strong>
        <small class="saldo-meta">Atualizado em 11/10/2025 às 15:30</small>
      </div>
    </section>

    <main class="financeiro-content">
      <section class="registro-card">
        <header>
          <h2>Registrar movimentação</h2>
          <p>Preencha as informações abaixo para lançar uma nova entrada ou saída.</p>
        </header>

        <form class="registro-form" @submit.prevent>
          <label class="field">
            <span>Valor</span>
            <input type="number" placeholder="Ex.: 250.00" min="0" step="0.01" />
          </label>

          <label class="field">
            <span>Tipo</span>
            <select>
              <option value="">Selecione</option>
              <option value="entrada">Entrada</option>
              <option value="saida">Saída</option>
            </select>
          </label>

          <label class="field">
            <span>Categoria</span>
            <select>
              <option value="">Selecione</option>
              <option value="alimentacao">Alimentação</option>
              <option value="transporte">Transporte</option>
              <option value="lazer">Lazer</option>
              <option value="outros">Outros</option>
            </select>
          </label>

          <button type="button" class="btn-adicionar">Adicionar</button>
        </form>
      </section>

      <section class="tabela-card">
        <header>
          <div>
            <h2>Histórico de movimentações</h2>
            <span>Últimos lançamentos registrados</span>
          </div>
          <button type="button" class="btn-exportar">Exportar relatório</button>
        </header>

        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Valor</th>
              <th>Tipo</th>
              <th>Categoria</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>11/10/2025</td>
              <td class="entrada">R$ 1.250,00</td>
              <td>Entrada</td>
              <td>Alimentação</td>
            </tr>
            <tr>
              <td>10/10/2025</td>
              <td class="saida">- R$ 320,00</td>
              <td>Saída</td>
              <td>Transporte</td>
            </tr>
            <tr>
              <td>08/10/2025</td>
              <td class="saida">- R$ 180,00</td>
              <td>Saída</td>
              <td>Lazer</td>
            </tr>
            <tr>
              <td>07/10/2025</td>
              <td class="entrada">R$ 2.000,00</td>
              <td>Entrada</td>
              <td>Outros</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  </div>
</template>

<script setup>
</script>

<style scoped>
.financeiro-page {
  min-height: calc(100vh - 96px);
  background: linear-gradient(180deg, #f4f7ff 0%, #ffffff 100%);
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: clamp(24px, 5vw, 56px);
  font-family: "Poppins", sans-serif;
  margin-top: 50px;

}

.hero {
  position: relative;
  padding: clamp(24px, 4vw, 40px);
  border-radius: 28px;
  background: linear-gradient(135deg, #0f4cbb 0%, #1787e3 65%, #4fd2ff 100%);
  color: #ffffff;
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
}

.hero::after {
  content: "";
  position: absolute;
  width: clamp(220px, 30vw, 360px);
  height: clamp(220px, 30vw, 360px);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  top: -120px;
  right: -120px;
  filter: blur(1px);
}

.hero-text {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 540px;
}

.hero-text h1 {
  margin: 0;
  font-size: clamp(28px, 5vw, 36px);
  font-weight: 700;
}

.hero-text p {
  margin: 0;
  font-size: 16px;
  line-height: 1.7;
  opacity: 0.85;
}

.saldo-card {
  position: relative;
  z-index: 1;
  margin-left: auto;
  max-width: 320px;
  padding: 24px 28px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(16px);
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-self: center;
  box-shadow: 0 18px 36px rgba(9, 39, 102, 0.25);
}

.saldo-label {
  font-size: 13px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  opacity: 0.85;
}

.saldo-valor {
  font-size: clamp(28px, 4vw, 34px);
  font-weight: 700;
}

.saldo-meta {
  font-size: 12px;
  opacity: 0.8;
}

.financeiro-content {
  display: grid;
  gap: 28px;
}

.registro-card,
.tabela-card {
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 22px 46px rgba(15, 34, 68, 0.12);
  border: 1px solid rgba(15, 52, 119, 0.08);
  padding: clamp(24px, 4vw, 36px);
}

.registro-card header h2,
.tabela-card h2 {
  margin: 0;
  font-size: 22px;
  color: #102140;
}

.registro-card header p {
  margin: 6px 0 0;
  font-size: 14px;
  color: #5c6678;
}

.registro-form {
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 18px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
  color: #4a5872;
}

.field input,
.field select {
  border: 1px solid rgba(96, 116, 153, 0.22);
  border-radius: 14px;
  padding: 12px 14px;
  font-size: 15px;
  background: #f7f9ff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.field input:focus,
.field select:focus {
  border-color: #0f62cc;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(15, 98, 204, 0.16);
  outline: none;
}

.btn-adicionar {
  align-self: flex-end;
  padding: 12px 28px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #1fc15b, #0a9151);
  color: #ffffff;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  box-shadow: 0 18px 32px rgba(10, 145, 81, 0.26);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn-adicionar:hover {
  transform: translateY(-2px);
  box-shadow: 0 22px 36px rgba(10, 145, 81, 0.32);
}

.tabela-card header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.tabela-card header span {
  display: block;
  margin-top: 6px;
  font-size: 13px;
  color: #5a6276;
}

.btn-exportar {
  padding: 10px 24px;
  border-radius: 999px;
  border: 1px solid rgba(16, 31, 64, 0.16);
  background: #ffffff;
  font-size: 14px;
  font-weight: 600;
  color: #19305c;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.btn-exportar:hover {
  background: #f2f5ff;
  transform: translateY(-1px);
  box-shadow: 0 12px 24px rgba(16, 31, 64, 0.14);
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-size: 15px;
  color: #21324e;
}

thead {
  background: #eff3ff;
}

th,
td {
  padding: 16px 18px;
  text-align: left;
}

th {
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #5d6881;
}

tbody tr + tr {
  border-top: 1px solid rgba(22, 42, 74, 0.08);
}

.entrada {
  color: #0a9151;
  font-weight: 600;
}

.saida {
  color: #cb2f45;
  font-weight: 600;
}

@media (max-width: 810px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .saldo-card {
    margin-left: 0;
    align-self: stretch;
  }

  .tabela-card header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .btn-exportar {
    align-self: stretch;
    text-align: center;
  }
}

@media (max-width: 540px) {
  .registro-form {
    grid-template-columns: 1fr;
  }

  table {
    font-size: 14px;
  }

  th,
  td {
    padding: 12px 14px;
  }
}
</style>
