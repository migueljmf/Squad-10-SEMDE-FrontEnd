<template>
  <div class="configuracoes-detalhe">
    <PageHero
      title="Cadastro de usuários"
      description="Inclua rapidamente novos membros para acompanhar as atividades do mandato."
    />

    <section class="grid">
      <article class="card cadastro">
        <header class="card__header">
          <div>
            <h2>Novo usuário</h2>
            <p>Preencha as informações para enviar o convite de acesso.</p>
          </div>
        </header>

        <form class="form" @submit.prevent="handleSubmit">
          <div class="form-row">
            <div class="form-group">
              <label for="nome-completo">Nome completo</label>
              <input id="nome-completo" type="text" placeholder="Ex.: Ana Pereira" />
            </div>
            <div class="form-group">
              <label for="email">E-mail institucional</label>
              <input id="email" type="email" placeholder="nome@mandatuum.com" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="papel">Papel no sistema</label>
              <select id="papel">
                <option>Administrador</option>
                <option>Editor</option>
                <option>Financeiro</option>
                <option>Operacional</option>
              </select>
            </div>
            <div class="form-group">
              <label for="departamento">Equipe</label>
              <input id="departamento" type="text" placeholder="Ex.: Gabinete Central" />
            </div>
          </div>

          <div class="form-group">
            <label for="observacoes">Observações</label>
            <textarea
              id="observacoes"
              rows="3"
              placeholder="Detalhes adicionais sobre o nível de acesso, horário de trabalho, etc."
            />
          </div>

          <div class="form-actions">
            <button type="submit" class="primary filled">Cadastrar usuário</button>
            <p>O novo membro receberá um convite por e-mail com instruções de acesso.</p>
          </div>
        </form>
      </article>
    </section>
  </div>
</template>

<script setup>
import PageHero from "@/components/PageHero.vue";

function handleSubmit() {
  console.info("Solicitado cadastro de usuário");
}
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
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
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

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 13px;
  font-weight: 600;
  color: #43526a;
}

input,
select,
textarea {
  border-radius: 14px;
  border: 1px solid rgba(21, 70, 173, 0.18);
  padding: 12px 16px;
  font-size: 14px;
  background: #f9fbff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  font-family: inherit;
  resize: vertical;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #2a6bff;
  box-shadow: 0 0 0 3px rgba(42, 107, 255, 0.18);
  background: #ffffff;
}

.form-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #5a6880;
}

.primary.filled {
  border: none;
  border-radius: 999px;
  padding: 12px 26px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.03em;
  cursor: pointer;
  background: linear-gradient(135deg, #2a6bff, #1542da);
  color: #ffffff;
  box-shadow: 0 18px 42px rgba(36, 84, 255, 0.28);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  align-self: flex-start;
}

.primary.filled:hover {
  transform: translateY(-2px);
  box-shadow: 0 22px 48px rgba(36, 84, 255, 0.36);
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
}
</style>
