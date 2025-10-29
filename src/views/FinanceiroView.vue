<template>
  <div class="financeiro-page">
    <PageHero
      title="Centro financeiro"
      description="Acompanhe o fluxo de entradas e saidas do mandato em um so lugar. Cadastre movimentacoes e mantenha a equipe informada sobre os recursos disponiveis."
      highlight-label="Saldo disponivel"
      :highlight-value="saldoAtual"
      :highlight-subtext="saldoAtualizacao"
    />

    <main class="financeiro-content">
      <section class="registro-card">
        <header>
          <h2>Registrar movimentacao</h2>
          <p>Preencha as informacoes abaixo para lancar uma nova entrada ou saida.</p>
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
              <option value="saida">Saida</option>
            </select>
          </label>

          <label class="field">
            <span>Categoria</span>
            <select>
              <option value="">Selecione</option>
              <option value="alimentacao">Alimentacao</option>
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
            <h2>Historico de movimentacoes</h2>
            <span>Ultimos lancamentos registrados</span>
          </div>
          <button type="button" class="btn-exportar">Exportar relatorio</button>
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
              <td>Alimentacao</td>
            </tr>
            <tr>
              <td>10/10/2025</td>
              <td class="saida">- R$ 320,00</td>
              <td>Saida</td>
              <td>Transporte</td>
            </tr>
            <tr>
              <td>08/10/2025</td>
              <td class="saida">- R$ 180,00</td>
              <td>Saida</td>
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
import PageHero from "@/components/PageHero.vue";

const saldoAtual = "R$ 12.450,00";
const saldoAtualizacao = "Atualizado em 11/10/2025 as 15:30";
</script>

<style scoped>
.financeiro-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #f4f7ff 0%, #ffffff 100%);
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 48px 40px 56px;
  font-family: "Poppins", sans-serif;
  box-sizing: border-box;
}

.financeiro-content {
  display: grid;
  grid-template-columns: minmax(0, 420px) minmax(0, 1fr);
  gap: 32px;
  align-items: start;
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
.tabela-card header h2 {
  margin: 0;
  font-size: 22px;
  color: #142346;
}

.registro-card header p {
  margin: 10px 0 0;
  color: #475569;
  font-size: 15px;
  line-height: 1.6;
}

.registro-form {
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  align-items: flex-end;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 14px;
  color: #475569;
}

.field span {
  font-weight: 600;
  letter-spacing: 0.02em;
}

.field input,
.field select {
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid rgba(148, 163, 184, 0.35);
  background: #f8fafc;
  font-size: 15px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.field input:focus,
.field select:focus {
  border-color: #2563eb;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.16);
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

@media (max-width: 1024px) {
  .financeiro-page {
    padding: 32px 24px 40px;
  }

  .financeiro-content {
    grid-template-columns: 1fr;
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

@media (max-width: 600px) {
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
