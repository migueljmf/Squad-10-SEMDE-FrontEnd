<template>
  <div class="configuracoes-detalhe">
    <PageHero
      title="Alteração de senha"
      description="Defina uma nova senha segura para a conta principal do mandato."
    />

    <section class="grid">
      <article class="card senha">
        <header class="card__header">
          <div>
            <h2>Atualize sua senha</h2>
            <p>Mantenha o acesso protegido utilizando combinações fortes de caracteres.</p>
          </div>
        </header>

        <form class="senha__form" @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="senha-atual">Senha atual</label>
            <input id="senha-atual" type="password" placeholder="Digite a senha atual" />
          </div>
          <div class="form-grid">
            <div class="form-group">
              <label for="nova-senha">Nova senha</label>
              <input id="nova-senha" type="password" placeholder="Nova senha" />
            </div>
            <div class="form-group">
              <label for="confirmar-senha">Confirmar nova senha</label>
              <input id="confirmar-senha" type="password" placeholder="Repita a nova senha" />
            </div>
          </div>

          <div class="senha__acoes">
            <button type="submit" class="primary filled">Atualizar senha</button>
            <small>Dica: utilize ao menos 8 caracteres, com letras, números e símbolos.</small>
          </div>
        </form>
      </article>
    </section>
  </div>
</template>

<script setup>
import PageHero from "@/components/PageHero.vue";

function handleSubmit() {
  console.info("Solicitada atualização de senha");
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
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 28px;
}

.card {
  background: #ffffff;
  border-radius: 24px;
  padding: 28px 32px;
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

.primary.filled {
  border: none;
  border-radius: 999px;
  padding: 10px 22px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.03em;
  cursor: pointer;
  background: linear-gradient(135deg, #2a6bff, #1542da);
  color: #ffffff;
  box-shadow: 0 18px 42px rgba(36, 84, 255, 0.28);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.primary.filled:hover {
  transform: translateY(-2px);
  box-shadow: 0 22px 48px rgba(36, 84, 255, 0.36);
}

.senha__form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-grid {
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

input {
  border-radius: 14px;
  border: 1px solid rgba(21, 70, 173, 0.18);
  padding: 12px 16px;
  font-size: 14px;
  background: #f9fbff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

input:focus {
  outline: none;
  border-color: #2a6bff;
  box-shadow: 0 0 0 3px rgba(42, 107, 255, 0.18);
  background: #ffffff;
}

.senha__acoes {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  color: #68748a;
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
