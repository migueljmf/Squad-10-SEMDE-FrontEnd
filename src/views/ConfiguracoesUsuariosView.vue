<template>
  <div class="configuracoes-detalhe">
    <PageHero
      title="Administração de usuários"
      description="Consulte e gerencie permissões, status e acessos da equipe já cadastrada na plataforma."
    />

    <section class="grid">
      <article class="card administracao">
        <header class="card__header">
          <div>
            <h2>Equipe cadastrada</h2>
            <p>Edite papéis, acompanhe status e suspenda acessos quando necessário.</p>
          </div>
          <button type="button" class="primary ghost">Exportar lista</button>
        </header>

        <div class="tabela-wrapper">
          <table>
            <thead>
              <tr>
                <th>Usuário</th>
                <th>Email</th>
                <th>Papel</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="usuario in usuarios" :key="usuario.email">
                <td>
                  <strong>{{ usuario.nome }}</strong>
                  <span class="descricao">{{ usuario.area }}</span>
                </td>
                <td>{{ usuario.email }}</td>
                <td>{{ usuario.papel }}</td>
                <td>
                  <span class="status" :class="usuario.statusClasse">{{ usuario.status }}</span>
                </td>
                <td class="acoes">
                  <button type="button" class="link">Editar</button>
                  <button type="button" class="link danger">Suspender</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>
    </section>
  </div>
</template>

<script setup>
import PageHero from "@/components/PageHero.vue";

const usuarios = [
  {
    nome: "Ana Pereira",
    area: "Coordenação",
    email: "ana.pereira@mandatuum.com",
    papel: "Administrador",
    status: "Ativo",
    statusClasse: "ativo",
  },
  {
    nome: "Lucas Andrade",
    area: "Financeiro",
    email: "lucas.andrade@mandatuum.com",
    papel: "Financeiro",
    status: "Ativo",
    statusClasse: "ativo",
  },
  {
    nome: "Renata Silva",
    area: "Comunicação",
    email: "renata.silva@mandatuum.com",
    papel: "Editor",
    status: "Convite pendente",
    statusClasse: "pendente",
  },
];
</script>

<style scoped>
.configuracoes-detalhe {
  min-height: 100vh;
  padding: 48px 32px 56px;
  background: linear-gradient(180deg, #f8fbff 0%, #f1f5f9 45%, #ffffff 100%);
  display: flex;
  flex-direction: column;
  gap: 32px;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
  gap: 28px;
}

.card {
  background: #ffffff;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 22px 46px rgba(11, 33, 78, 0.14);
  border: 1px solid rgba(20, 56, 126, 0.08);
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.card__header h2 {
  font-size: 20px;
  font-weight: 700;
  color: #1b2a4b;
  margin: 0 0 6px;
}

.card__header p {
  margin: 0;
  color: #4c5c74;
  font-size: 14px;
}

.primary.ghost {
  border: none;
  border-radius: 999px;
  padding: 10px 22px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.03em;
  cursor: pointer;
  background: rgba(32, 83, 202, 0.1);
  color: #1f3fb5;
  transition: transform 0.2s ease, background 0.2s ease;
}

.primary.ghost:hover {
  background: rgba(32, 83, 202, 0.2);
  transform: translateY(-1px);
}

.tabela-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

thead {
  color: #6b7a94;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.06em;
}

th {
  text-align: left;
  padding-bottom: 12px;
}

tbody tr {
  border-top: 1px solid rgba(21, 70, 173, 0.08);
}

tbody td {
  padding: 18px 0;
  vertical-align: top;
}

strong {
  display: block;
  color: #1e2f4f;
  margin-bottom: 4px;
}

.descricao {
  display: block;
  color: #66748e;
  font-size: 13px;
}

.status {
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.status.ativo {
  background: rgba(35, 187, 119, 0.12);
  color: #189964;
}

.status.pendente {
  background: rgba(52, 146, 255, 0.16);
  color: #2264d4;
}

.acoes {
  display: flex;
  gap: 12px;
}

.link {
  background: transparent;
  border: none;
  color: #1f3fb5;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
}

.link.danger {
  color: #d93050;
}

@media (max-width: 1024px) {
  .configuracoes-detalhe {
    padding: 32px 24px 40px;
  }
}

@media (max-width: 640px) {
  .configuracoes-detalhe {
    padding: 24px 16px 36px;
  }

  .card__header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
