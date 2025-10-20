<template>
  <div class="config-root">
    <h1>Configurações</h1>
    <p class="muted">
      Nesta página você pode alterar a senha, cadastrar usuários e administrar
      usuários existentes.
    </p>

    <div class="toolbar">
      <button class="icon" @click="toggle('change')" :title="'Alterar senha'">
        🔒
      </button>
      <button
        class="icon"
        @click="toggle('register')"
        :title="'Cadastrar usuário'"
      >
        ➕
      </button>
      <button
        class="icon"
        @click="toggle('manage')"
        :title="'Administrar usuários'"
      >
        👥
      </button>
    </div>

    <div class="grid">
      <!-- Change Password -->
      <section v-if="visible.change" class="card">
        <h2>Alterar senha</h2>
        <form @submit.prevent="changePassword">
          <label>
            Email
            <input v-model="cp.email" type="email" required />
          </label>
          <label>
            Senha atual
            <input v-model="cp.current" type="password" required />
          </label>
          <label>
            Nova senha
            <input v-model="cp.newPass" type="password" required />
          </label>
          <label>
            Confirmar nova senha
            <input v-model="cp.confirm" type="password" required />
          </label>
          <div class="actions">
            <button class="btn-save" type="submit">Alterar senha</button>
          </div>
          <p class="msg" v-if="cp.msg">{{ cp.msg }}</p>
        </form>
      </section>

      <!-- Register User -->
      <section v-if="visible.register" class="card">
        <h2>Cadastrar usuário</h2>
        <form @submit.prevent="registerUser">
          <label>
            Nome
            <input v-model="ru.nome" type="text" required />
          </label>
          <label>
            Email
            <input v-model="ru.email" type="email" required />
          </label>
          <label>
            Senha
            <input v-model="ru.senha" type="password" required />
          </label>
          <label>
            Papel
            <select v-model="ru.role">
              <option value="USER">Usuário</option>
              <option value="ADMIN">Administrador</option>
            </select>
          </label>
          <label class="inline">
            <input type="checkbox" v-model="ru.permission" /> Tem permissão
          </label>

          <div class="actions">
            <button class="btn-save" type="submit">Cadastrar</button>
          </div>
          <p class="msg" v-if="ru.msg">{{ ru.msg }}</p>
        </form>
      </section>
    </div>

    <!-- Manage Users -->
    <section v-if="visible.manage" class="card full">
      <h2>Administrar usuários</h2>
      <p class="muted">
        Ative/desative permissões ou remova usuários. (Dados salvos localmente
        neste browser.)
      </p>

      <table class="users-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Papel</th>
            <th>Permissão</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in users" :key="u.id">
            <td v-if="editingId !== u.id">{{ u.nome }}</td>
            <td v-else>
              <input v-model="edit.nome" />
            </td>
            <td>{{ u.email }}</td>
            <td v-if="editingId !== u.id">{{ u.role }}</td>
            <td v-else>
              <select v-model="edit.role">
                <option>USER</option>
                <option>ADMIN</option>
              </select>
            </td>
            <td>
              <input
                type="checkbox"
                :checked="u.permission"
                @change="togglePermission(u.id)"
              />
            </td>
            <td>
              <button v-if="editingId !== u.id" @click="startEdit(u)">
                Editar
              </button>
              <button v-else @click="saveEdit(u.id)">Salvar</button>
              <button @click="deleteUser(u.id)">Remover</button>
            </td>
          </tr>
          <tr v-if="users.length === 0">
            <td colspan="5" class="muted">Nenhum usuário cadastrado</td>
          </tr>
        </tbody>
      </table>
    </section>

    <p class="warn">
      Atenção: isso é um mock local para desenvolvimento. Em produção, integre
      estas ações ao backend e não armazene senhas em texto plano.
    </p>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { hasPermission } from "../auth/auth";

const USERS_KEY = "app_users_v1";

const defaultUsers = [
  {
    id: 1,
    nome: "Administrador",
    email: "admin@local",
    senha: "admin",
    role: "ADMIN",
    permission: true,
  },
];

const users = ref([]);
const editingId = ref(null);
const edit = reactive({ nome: "", role: "USER" });

const visible = reactive({ change: false, register: false, manage: false });

const toggle = (k) => {
  visible[k] = !visible[k];
};

const loadUsers = () => {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (raw) {
      users.value = JSON.parse(raw);
    } else {
      users.value = [...defaultUsers];
      saveUsers();
    }
  } catch (e) {
    console.error("Erro ao carregar usuarios:", e);
    users.value = [...defaultUsers];
  }
};

const saveUsers = () => {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users.value));
  } catch (e) {
    console.error("Erro ao salvar usuarios:", e);
  }
};

// Change password
const cp = reactive({
  email: "",
  current: "",
  newPass: "",
  confirm: "",
  msg: "",
});
const changePassword = () => {
  cp.msg = "";
  const u = users.value.find((x) => x.email === cp.email);
  if (!u) {
    cp.msg = "Usuário não encontrado";
    return;
  }
  if (u.senha !== cp.current) {
    cp.msg = "Senha atual incorreta";
    return;
  }
  if (cp.newPass !== cp.confirm) {
    cp.msg = "Confirmação não confere";
    return;
  }
  u.senha = cp.newPass;
  saveUsers();
  cp.msg = "Senha alterada com sucesso";
  cp.current = cp.newPass = cp.confirm = "";
};

// Register user
const ru = reactive({
  nome: "",
  email: "",
  senha: "",
  role: "USER",
  permission: false,
  msg: "",
});
const registerUser = () => {
  ru.msg = "";
  if (users.value.find((x) => x.email === ru.email)) {
    ru.msg = "Email já cadastrado";
    return;
  }
  const newUser = {
    id: Date.now(),
    nome: ru.nome,
    email: ru.email,
    senha: ru.senha,
    role: ru.role,
    permission: ru.permission,
  };
  users.value.push(newUser);
  saveUsers();
  ru.msg = "Usuário cadastrado";
  ru.nome = ru.email = ru.senha = "";
  ru.role = "USER";
  ru.permission = false;
};

// Manage
const togglePermission = (id) => {
  const u = users.value.find((x) => x.id === id);
  if (u) {
    u.permission = !u.permission;
    saveUsers();
  }
};

const deleteUser = (id) => {
  if (!confirm("Remover usuário?")) return;
  users.value = users.value.filter((x) => x.id !== id);
  saveUsers();
};

const startEdit = (u) => {
  editingId.value = u.id;
  edit.nome = u.nome;
  edit.role = u.role;
};

const saveEdit = (id) => {
  const u = users.value.find((x) => x.id === id);
  if (u) {
    u.nome = edit.nome;
    u.role = edit.role;
    saveUsers();
    editingId.value = null;
  }
};

onMounted(loadUsers);
</script>

<style scoped>
.config-root {
  padding: 18px;
  max-width: 1100px;
}
.muted {
  color: #666;
}
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 12px;
}
.card {
  background: #fff;
  border: 1px solid #e6e6e6;
  padding: 14px;
  border-radius: 8px;
}
.card.full {
  grid-column: 1 / -1;
}
label {
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
}
input[type="text"],
input[type="email"],
input[type="password"],
select {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
.inline {
  flex-direction: row;
  align-items: center;
  gap: 8px;
}
.actions {
  margin-top: 8px;
}
.btn-save {
  background: #1565c0;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
}
.msg {
  margin-top: 8px;
  color: green;
}
.warn {
  margin-top: 12px;
  color: #a00;
}
.users-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;
}
.users-table th,
.users-table td {
  border: 1px solid #eee;
  padding: 8px;
  text-align: left;
}
.users-table th {
  background: #fafafa;
}
.users-table .muted {
  text-align: center;
}
</style>
