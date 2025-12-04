<template>
  <div class="login-wrapper">
    <div class="login-frame">
      <div class="login-brand">
        <img src="../assets/img/logo.png" alt="Logo do projeto" class="logo" />
        <div class="brand-text">
          <h1 class="login-title">Mandattum</h1>
          <small class="logo-note">Simplificando a gestão, fortalecendo equipes e elevando o nível das entregas com organização, clareza e eficiência.</small>
        </div>
      </div>

      <div class="login-card">
        <h2>Entrar</h2>

        <form @submit.prevent="handleLogin" novalidate>
          <div class="form-group">
            <label for="email">Email ou Usuário</label>
            <input
              id="email"
              type="text"
              v-model="email"
              placeholder="Digite seu email ou usuário"
              autocomplete="username"
            />
          </div>

          <div class="form-group">
            <label for="senha">Senha</label>
            <input
              id="senha"
              type="password"
              v-model="senha"
              placeholder="Digite sua senha"
              autocomplete="current-password"
            />
          </div>

          <div class="row-between">
            <div class="helper">
              <small>Use seu e-mail institucional</small>
            </div>
          </div>

          <button class="btn" type="submit" :disabled="loading">
            {{ loading ? "Entrando..." : "Entrar" }}
          </button>
        </form>

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "../services/authService";

const email = ref("");
const senha = ref("");
const loading = ref(false);
const errorMessage = ref("");
const router = useRouter();

async function handleLogin() {
  if (!email.value || !senha.value) {
    errorMessage.value = "Por favor, preencha todos os campos!";
    return;
  }

  try {
    loading.value = true;
    errorMessage.value = "";

    await login(email.value, senha.value);

    // redireciona para a tela inicial
    router.push({ name: "Inicio" });
  } catch (err: any) {
    console.error("Erro no login:", err);
    errorMessage.value = "Credenciais inválidas. Tente novamente.";
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
:root {
  --primary-blue: #1565c0;
  --accent: #1e40af;
  --bg: #f3f6fb;
}


* { box-sizing: border-box; }
body, .login-wrapper { font-family: 'Poppins', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; }

.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(180deg, #eef4ff 0%, #f8fbff 100%);
  margin: 0;
  padding: 28px;
}

.login-frame {
  width: 920px;
  max-width: 96vw;
  border-radius: 20px;
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 28px;
  align-items: center;
  padding: 28px;
  background: linear-gradient(135deg, #ffffff 0%, #f8fbff 100%);
  box-shadow: 0 18px 48px rgba(16, 24, 40, 0.08);
  border: 1px solid rgba(30, 58, 138, 0.06);
}
.login-title {
  font-family: 'Poppins', sans-serif;
  font-size: 38px; 
  font-weight: 700;
  color: #1565c0; 
  margin: 0 0 16px;
  line-height: 1.3;
}

.login-brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
  padding: 24px;
}

.logo { width: 160px; height: auto; display:block; }
.brand-text { max-width: 300px; text-align:center; color: #475569; font-size: 13px; }
.logo-note code { background: #eef2ff; padding: 2px 6px; border-radius: 6px; font-size: 12px; }

.login-card {
  background-color: #ffffff;
  padding: 32px 30px;
  border-radius: 14px;
  width: 100%;
  box-shadow: 0 8px 28px rgba(15, 23, 42, 0.06);
}

.login-card h2 {
  margin: 0 0 18px 0;
  font-size: 22px;
  font-weight: 700;
  color: var(--accent);
}

.form-group { margin-bottom: 14px; }
.form-group label { display:block; font-size: 13px; font-weight: 600; color: #334155; margin-bottom:8px }
.form-group input { width:100%; padding: 14px 12px; border-radius: 10px; border: 1px solid rgba(15,23,42,0.06); font-size:15px; }
.form-group input:focus { outline: none; box-shadow: 0 6px 18px rgba(37,99,235,0.08); border-color: var(--accent) }

.row-between { display:flex; justify-content:space-between; align-items:center; margin-bottom: 18px; }
.forgot a { color: var(--accent); font-weight:600; text-decoration:none }
.helper small { color:#64748b }

.btn { display:inline-flex; align-items:center; justify-content:center; gap:8px; background: linear-gradient(135deg,#2563eb,#1d4ed8); color: white; border: none; padding: 14px 22px; border-radius: 10px; font-weight:700; cursor:pointer; width:100%; }
.btn[disabled] { opacity:0.6; cursor:not-allowed }

.error { margin-top:12px; color:#b91c1c; font-weight:600 }

@media (max-width: 900px) {
  .login-frame { grid-template-columns: 1fr; padding: 18px }
  .logo { width: 120px }
}

</style>