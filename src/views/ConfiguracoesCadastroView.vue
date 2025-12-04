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
              <label for="role">Papel</label>
              <select id="role" v-model="role">
                <option value="admin">Administrador</option>
                <option value="parliamentary">Parlamentar</option>
                <option value="advisor">Assessor</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="name">Nome completo</label>
              <input id="name" v-model="form.name" type="text" placeholder="Ex.: Ana Pereira" required />
            </div>

            <div class="form-group">
              <label for="email">E-mail</label>
              <input id="email" v-model="form.email" type="email" placeholder="nome@exemplo.com" required />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="cpf">CPF</label>
              <input id="cpf" v-model="form.cpf" type="text" placeholder="000.000.000-00" required />
            </div>

            <div class="form-group">
              <label for="password">Senha</label>
              <input id="password" v-model="form.password" type="password" placeholder="Senha" required />
            </div>
          </div>

          <!-- Campos específicos por papel -->
          <div v-if="role === 'parliamentary'">
            <div class="form-row">
              <div class="form-group">
                <label for="city">Cidade</label>
                <input id="city" v-model="form.city" type="text" placeholder="Nome da cidade" />
              </div>
              <div class="form-group">
                <label for="type">Tipo</label>
                <select id="type" v-model="form.type">
                  <option value="VEREADOR">VEREADOR</option>
                  <option value="DEPUTADO_ESTADUAL">DEPUTADO_ESTADUAL</option>
                  <option value="DEPUTADO_FEDERAL">DEPUTADO_FEDERAL</option>
                  <option value="SENADOR">SENADOR</option>
                </select>
              </div>
            </div>
          </div>

          <div v-if="role === 'advisor'">
            <div class="form-row">
              <div class="form-group">
                <label for="parliamentary">Parlamentar (email)</label>
                <input id="parliamentary" v-model="form.parliamentary" type="text" placeholder="Email do parlamentar" />
              </div>
              <div class="form-group">
                <label for="team">Equipe</label>
                <select id="team" v-model="form.team">
                  <option value="INTERNO">INTERNO</option>
                  <option value="EXTERNO">EXTERNO</option>
                </select>
              </div>
            </div>
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
import { ref } from 'vue'
import PageHero from "@/components/PageHero.vue";
import api from '@/services/api'
import { citiesApi } from '@/services/citiesApi';

const role = ref('admin')

const form = ref({
  name: '',
  email: '',
  cpf: '',
  password: '',
  // parliamentary-specific
  city: '',
  type: 'VEREADOR',
  // advisor-specific
  parliamentary: '',
  team: 'INTERNO'
})

async function handleSubmit() {
  try {
    if (!form.value.email || !form.value.password || !form.value.name || !form.value.cpf) {
      return alert('Preencha os campos obrigatórios: nome, email, cpf e senha.');
    }

    if (role.value === 'admin') {
      const payload = {
        email: form.value.email,
        password: form.value.password,
        name: form.value.name,
        cpf: form.value.cpf,
        role: 'admin'
      }
      // tentar endpoint comum /auth/register e fallback para /auth/registe (conforme solicitado)
      try {
        await api.post('/auth/register', payload)
      } catch (e) {
        // se erro 404 ou rota não existe, tentar /auth/registe
        if (e?.response?.status === 404) {
          await api.post('/auth/registe', payload)
        } else throw e
      }
      resetForm()
      return
    }

    if (role.value === 'parliamentary') {

      if (!form.value.type) return alert('Selecione o tipo de parlamentar.');

      const cityId = (await citiesApi.search(form.value.city))?.[0]?.id;
      console.log('cityId', cityId)
      const payload = {
        email: form.value.email,
        password: form.value.password,
        name: form.value.name,
        cpf: form.value.cpf,
        cityId: cityId || null,
        type: form.value.type
      }
      await api.post('/parliamentary', payload)
      resetForm()
      return
    }

    if (role.value === 'advisor') {
      if (!form.value.parliamentary) return alert('Informe o parlamentar associado (id ou email).')
      const payload = {
        email: form.value.email,
        password: form.value.password,
        name: form.value.name,
        cpf: form.value.cpf,
        parliamentaryEmail: form.value.parliamentary,
        team: form.value.team
      }
      await api.post('/advisor', payload)
      resetForm()
      return
    }

  } catch (e) {
    console.error('Erro ao cadastrar usuário', e)
    const msg = e?.response?.data?.message || e?.message || 'Erro desconhecido'
  }
}

function resetForm() {
  form.value = {
    name: '', email: '', cpf: '', password: '', city: '', type: 'VEREADOR', parliamentary: '', team: 'INTERNO'
  }
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
