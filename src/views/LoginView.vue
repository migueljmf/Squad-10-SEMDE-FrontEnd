<template>
  <div class="login-wrapper">
    <div class="login-frame">
      <div class="login-card">
        <h2>FAZER LOGIN</h2>

        <form @submit.prevent="handleLogin" novalidate>
          <div class="form-group">
            <label for="email">Email ou Usuário</label>
            <input
              id="email"
              type="text"
              v-model="email"
              placeholder="Digite seu email ou usuário"
            />
          </div>

          <div class="form-group">
            <label for="senha">Senha</label>
            <input
              id="senha"
              type="password"
              v-model="senha"
              placeholder="Digite sua senha"
            />
          </div>

          <div class="forgot">
            <a href="#">Esqueceu a senha?</a>
          </div>

          <button class="btn" type="submit">ENTRAR</button>
        </form>
      </div>
    </div>
  </div>
</template>



<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const senha = ref("");
const router = useRouter();

function handleLogin() {
  if (!email.value || !senha.value) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  // validar com backend
  alert(`Login com: ${email.value}`);

  // redireciona para a tela inicial
  router.push("/inicio");
}
</script>

<style scoped>
:root {
  --primary-blue: #1565c0;
  --gray-light: #f5f7fa;
}

/* Área total */
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: var(--gray-light);
  margin: 0;
  padding: 20px;
}

.login-frame {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 700px;
  height: 620px;
  background-color: var(--primary-blue);
  border-radius: 32px;
  padding: 10px;
}

/* Frame interno */
.login-card {
  background-color: white;
  padding: 40px 30px;
  border-radius: 24px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(21, 101, 192, 0.507); 
  text-align: center;
}

.login-card h2 {
  margin-bottom: 25px;
  font-size: 28px;
  font-weight: bold;
  color: #000;
}

/* Inputs */
.form-group {
  margin-bottom: 20px;
  text-align: left;
}

.form-group label {
  font-size: 15px;
  font-weight: 500;
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  height: 66px;
  max-width: 460px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid #aaa;
  font-size: 15px;
}

.form-group input:focus {
  border-color: var(--primary-blue);
  outline: none;
  box-shadow: 0 0 8px rgba(21, 101, 192, 0.4); 
}

/*  esqueceu senha */
.forgot {
  margin: 20px 0;
  text-align: center;
}

.forgot a {
  color: var(--primary-blue);
  font-weight: 600;
  text-decoration: none;
}

.forgot a:hover {
  text-decoration: underline;
}

/* Botão azul de ENTRAR */
.btn {
  background-color: rgb(74, 137, 253);
  color: #fff;
  border: none;
  width: 269px;
  height: 65px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(21, 101, 192, 0.4);
  text-align: center;
  
}

.btn:hover {
  background-color: #1565c0; 
}
</style>