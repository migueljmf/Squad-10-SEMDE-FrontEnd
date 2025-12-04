<template>
  <div class="financeiro-page">
    <PageHero
      title="Centro financeiro"
      description="Acompanhe o fluxo de entradas e saidas do mandato em um so lugar. Cadastre movimentações e mantenha a equipe informada sobre os recursos disponiveis."
      highlight-label="Saldo disponivel"
      :highlight-value="saldoAtual"
      :highlight-subtext="saldoAtualizacao"
    />

    <main class="financeiro-content">
      <section class="registro-card">
        <header>
          <h2>Registrar movimentação</h2>
          <p>Preencha as informações abaixo para lancar uma nova entrada ou saida.</p>
        </header>

        <form class="registro-form" @submit.prevent="sendForm">
          <label class="field">
            <span>Valor</span>
            <input type="number" v-model="value"  placeholder="Ex.: 250.00" min="0" step="0.01" />
          </label>

          <label class="field">
            <span>Tipo</span>
            <select v-model="type">
              <option value="">Selecione</option>
              <option value="ENTRADA">Entrada</option>
              <option value="SAIDA">Saida</option>
            </select>
          </label>

          <label class="field">
            <span>Categoria</span>
            <select v-model="categoria">
              <option value="">Selecione</option>
              <option v-for="cat in financialCategories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
            </select>
          </label>
          <label class="field">
            <span>Descrição</span>
            <textarea v-model="description" placeholder="Informe a descrição da movimentação"></textarea>
          </label>

          <button type="submit" class="btn-adicionar">Adicionar</button>
        </form>
      </section>

      <section class="tabela-card">
        <header>
          <div>
            <h2>Historico de movimentações</h2>
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
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="financial in financials" :key="financial.id">
              <td>{{ financial.date }}</td>
              <td :class="financial.type.toLowerCase()">{{ financial.value }}</td>
              <td>{{ financial.type }}</td>
              <td>{{financial.category}}</td>
              <td class="td-wrap">{{ financial.description }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  </div>
</template>

<script setup>
import PageHero from "@/components/PageHero.vue";
import { financialCategoriesApi } from "@/services/financialCategoriesApi";
import { financialApi } from "@/services/financialApi";
import { onMounted, ref } from "vue";

const categoria = ref("");
const financialCategories = ref([]);
const financials = ref([]);
const saldoAtual = ref(0);
const saldoAtualizacao = ref(""); 

const type = ref("");
const value = ref(0);
const description = ref("");

onMounted(async () => {
  try {
    // Carrega categorias
    financialCategories.value = await financialCategoriesApi.getAll();
  } catch (e) {
    console.error("Erro ao carregar categorias:", e);
  }

  try {
    // Carrega movimentações financeiras
    financials.value = await financialApi.getAll();

    // Ordena pela data (mais recente por último)
    financials.value.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Formata as movimentações
    financials.value = financials.value.map(financial => ({
      ...financial,
      dateObj: new Date(financial.date),
      date: new Date(financial.date).toLocaleDateString("pt-BR"),
      formattedValue: `R$ ${financial.value.toFixed(2).replace('.', ',')}`,
      category:
        financialCategories.value.find(cat => cat.id === financial.financialCategoryId)?.name ||
        "N/A",
    }));
    financials.value.sort((a, b) => new Date(b.dateObj) - new Date(a.dateObj));


    // Calcula saldo com base no tipo
    saldoAtual.value = financials.value.reduce((total, financial) => {
      if (financial.type === "ENTRADA") return total + financial.value;
      if (financial.type === "SAIDA") return total - financial.value;
      return total;
    }, 0);

    // Define a data da última atualização com base na última movimentação
    if (financials.value.length > 0) {
      const ultima = financials.value[financials.value.length - 1].dateObj;
      const data = ultima.toLocaleDateString("pt-BR");
      const hora = ultima.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
      saldoAtualizacao.value = `Atualizado em ${data} às ${hora}`;
    } else {
      saldoAtualizacao.value = "Nenhuma movimentação registrada";
    }

    console.log("Saldo atual:", saldoAtual.value.toFixed(2));
    console.log(saldoAtualizacao.value);
  } catch (e) {
    console.error("Erro ao carregar movimentações financeiras:", e);
  }
});
function cleanForm(){
  type.value = "";
  value.value = 0;
  description.value = "";
  categoria.value = "";
}

async function sendForm(){
  try {
    let valor = value.value;
    if (typeof valor === "string") {
      valor = valor.replace(",", ".");
    }
    valor = parseFloat(valor)
    const payload = {
      type: type.value,
      value: parseFloat(valor.toFixed(2)),
      description: description.value,
      financialCategoryId:categoria.value,
      date: new Date(),
    };
    await financialApi.create(payload);
    

    const formatPayload = {
      ...payload,
      dateObj: new Date(payload.date),
      date: new Date(payload.date).toLocaleDateString("pt-BR"),
      formattedValue: `R$ ${payload.value.toFixed(2).replace('.', ',')}`,
      category:
        financialCategories.value.find(cat => cat.id === payload.financialCategoryId)?.name ||
        "N/A",
    };

    financials.value.push(formatPayload);
    financials.value.sort((a, b) => new Date(b.dateObj) - new Date(a.dateObj));

    cleanForm();
  } catch (error) {
   console.error("Erro ao enviar o formulário:", error); 
  }
}
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

.td-wrap {
  max-width: 250px;
  white-space: normal;
  word-break: break-word;
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
.field select, .field textarea {
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
