<template>
  <div
    class="config-root"
    :class="{ 'panel-centered': visible.change || visible.register }"
  >
    <div class="center-action">
      <button
        class="big-action change"
        @click="openOnly('change')"
        aria-label="Alterar senha"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M12 1.5C9.24 1.5 7 3.74 7 6.5V9H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-1V6.5C17 3.74 14.76 1.5 12 1.5z"
            stroke="rgba(255,255,255,0.95)"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>Alterar senha</span>
      </button>

      <button
        class="big-action register"
        @click="openOnly('register')"
        aria-label="Cadastrar usuário"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zM6 19v-1c0-2.21 3.58-4 6-4s6 1.79 6 4v1H6z"
            stroke="rgba(255,255,255,0.95)"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>Cadastrar usuário</span>
      </button>

      <button
        class="big-action manage"
        @click="openOnly('manage')"
        aria-label="Administrar usuários"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zM8 11c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zM8 13c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zM16 13c-.29 0-.62.02-.97.05 1.16.84 1.97 1.99 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"
            stroke="rgba(255,255,255,0.95)"
            stroke-width="0.9"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>Administrar usuários</span>
      </button>

      <button
        class="small-ellipsis"
        title="Mais opções"
        aria-label="Mais opções"
      >
        ⋯
      </button>
    </div>

    <div class="grid">
      <!-- Change Password -->
      <section v-if="visible.change" class="card center-card">
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
      <section v-if="visible.register" class="card center-card">
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

// Open only the requested panel and close others. If 'manage' is opened,
// also expose the permissions panel state.
const openOnly = (k) => {
  Object.keys(visible).forEach((key) => {
    visible[key] = false;
  });
  visible[k] = true;
  if (k === "manage") {
    visible.permissions = true;
  } else {
    visible.permissions = false;
  }
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

// Permissions UI state
const permissionsList = [
  { key: "view_dashboard", label: "Dashboard" },
  { key: "view_acoes", label: "Ações" },
  { key: "view_gestao", label: "Gestão de Tarefas" },
  { key: "view_cadastro", label: "Cadastro" },
  { key: "view_configuracao", label: "Configurações" },
  { key: "view_eleicoes", label: "Eleição 2026" },
  { key: "view_financeiro", label: "Financeiro" },
];

const roles = ["USER", "ADMIN", "SUPERVISOR"];
const selectedRole = ref("ADMIN");
const localPerms = reactive({});

const loadPermissions = () => {
  try {
    const raw = localStorage.getItem("app_role_permissions");
    if (raw) {
      const parsed = JSON.parse(raw);
      // load permissions for selected role (default ADMIN)
      const p = parsed[selectedRole.value] || {};
      permissionsList.forEach((item) => {
        localPerms[item.key] = !!p[item.key];
      });
    } else {
      permissionsList.forEach((item) => {
        localPerms[item.key] = true;
      });
    }
  } catch (e) {
    permissionsList.forEach((item) => {
      localPerms[item.key] = true;
    });
  }
};

const savePermissions = () => {
  try {
    const raw = localStorage.getItem("app_role_permissions");
    const parsed = raw ? JSON.parse(raw) : {};
    parsed[selectedRole.value] = {};
    permissionsList.forEach((item) => {
      parsed[selectedRole.value][item.key] = !!localPerms[item.key];
    });
    localStorage.setItem("app_role_permissions", JSON.stringify(parsed));
    alert("Permissões salvas localmente");
  } catch (e) {
    console.error("Erro ao salvar permissoes", e);
  }
};

const roleLabel = (r) => (r === "ADMIN" ? "Administrador do Sistema" : r);

onMounted(() => {
  loadPermissions();
});

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
/* ==== CONTAINER PRINCIPAL ==== */
.config-root {
  padding: 32px;
  max-width: 1100px;
  margin: 40px auto;
  background: linear-gradient(180deg, #f9fbff, #f1f5f9);
  border-radius: 18px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  font-family: "Inter", "Segoe UI", sans-serif;
}

/* ==== TÍTULOS E TEXTOS ==== */
h1 {
  font-size: 1.6rem;
  color: #1e293b;
  font-weight: 700;
  margin-bottom: 4px;
}

.muted {
  color: #64748b;
  font-size: 0.95rem;
  margin-bottom: 20px;
}

/* ==== TOOLBAR COM BOTÕES ==== */
.toolbar {
  display: flex;
  gap: 12px;
  margin-top: 12px;
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  font-size: 22px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.icon:hover {
  background: #eff6ff;
  border-color: #bfdbfe;
  transform: translateY(-2px);
}

/* ==== GRID DOS CARDS ==== */
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  margin-top: 20px;
}

/* When centering a single panel, make the grid behave as a centered column */
.panel-centered .grid {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 0;
  margin-top: 18px;
}

.card {
  background: #fff;
  border-radius: 14px;
  border: 1px solid #eef2f6;
  box-shadow: 0 6px 28px rgba(16, 24, 40, 0.04);
  padding: 28px; /* larger card padding for bigger form */
  transition: all 0.2s ease;
}

.card.full {
  grid-column: 1 / -1;
}

/* Disable hover transform on cards for a stable UI */
.card:hover {
  transform: none;
}

/* ==== FORMULÁRIOS ==== */
label {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  color: #334155;
  font-size: 0.9rem;
  font-weight: 500;
}

input[type="text"],
input[type="email"],
input[type="password"],
select {
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid #cbd5e1;
  background: #fff;
  margin-top: 6px;
  transition: border-color 0.2s;
}

input:focus,
select:focus {
  border-color: #3b82f6;
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

.inline {
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

.actions {
  margin-top: 14px;
}

.btn-save {
  background: #1d4ed8;
  color: #fff;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-save:hover {
  background: #2563eb;
  transform: translateY(-2px);
}

.msg {
  margin-top: 10px;
  color: #16a34a;
  font-size: 0.9rem;
}

/* ==== TABELA DE USUÁRIOS ==== */
.users-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 14px;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.03);
}

.users-table th {
  background: #f1f5ff;
  padding: 14px;
  text-align: left;
  font-weight: 600;
  color: #334155;
  border-bottom: 1px solid #e2e8f0;
}

.users-table td {
  padding: 14px;
  border-bottom: 1px solid #f1f5f9;
  color: #475569;
}

.users-table tr:last-child td {
  border-bottom: none;
}

.users-table button {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
  font-size: 0.85rem;
  margin-right: 4px;
}

.users-table button:hover {
  background: #eff6ff;
}

/* ==== PERMISSIONS CARD ==== */
.permissions-card {
  margin-top: 20px;
  background: linear-gradient(180deg, #ffffff, #f8fbff);
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 6px 20px rgba(14, 50, 100, 0.04);
  padding: 20px;
}

.perm-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.perm-title {
  font-weight: 700;
  font-size: 1rem;
  color: #1e293b;
}

.perm-sub {
  color: #64748b;
  font-size: 0.85rem;
}

.perm-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.perm-role select {
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}

.perm-list {
  list-style: none;
  padding: 12px 0 0 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.perm-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 8px;
  background: #f9fafb;
  border: 1px solid #f1f5f9;
}

.perm-label {
  color: #334155;
  font-size: 0.9rem;
}

.perm-item input[type="checkbox"] {
  width: 18px;
  height: 18px;
}

/* ==== RESPONSIVIDADE ==== */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .perm-list {
    grid-template-columns: 1fr;
  }

  .toolbar {
    flex-wrap: wrap;
  }
}

/* ==== BOTÕES PRINCIPAIS (AÇÕES) ==== */
.center-action {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin: 56px 0 18px 0; /* moved further down from header */
  background: linear-gradient(135deg, #e3f2fd, #f8fbff);
  border-radius: 14px;
  padding: 20px;
  box-shadow: 0 6px 18px rgba(59, 130, 246, 0.08);
}

.big-action {
  display: flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, #2196f3, #21cbf3);
  border: none;
  color: #fff;
  padding: 14px 30px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.3px;
  box-shadow: 0 6px 18px rgba(33, 203, 243, 0.25);
  cursor: pointer;
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;
}

.big-action::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.3), transparent);
  transition: 0.4s;
}

.big-action:hover::after {
  left: 100%;
}

.big-action:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 22px rgba(33, 203, 243, 0.35);
}

.big-action:active {
  transform: translateY(-1px) scale(0.98);
}

/* Variants */
.big-action.change {
  background: linear-gradient(90deg, #6366f1, #06b6d4);
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.18);
}
.big-action.register {
  background: linear-gradient(90deg, #60a5fa, #4fd1c5);
  box-shadow: 0 8px 20px rgba(79, 209, 197, 0.14);
}
.big-action.manage {
  background: linear-gradient(90deg, #10b981, #06b6d4);
  box-shadow: 0 8px 20px rgba(6, 182, 212, 0.14);
}

.big-action span {
  display: inline-block;
  transform: translateY(0);
}

.small-ellipsis {
  background: #fff;
  border: 1px solid #111827;
  width: 44px;
  height: 44px;
  border-radius: 8px;
  margin-left: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.small-ellipsis:hover {
  transform: translateY(-2px);
}

/* Center card utility for single-column centered forms */
.center-card {
  margin: 0 auto;
  max-width: 820px;
  width: 100%;
}

/* Make center-card wider on larger viewports */
@media (min-width: 1200px) {
  .center-card {
    max-width: 680px;
  }
}

@media (max-width: 768px) {
  .panel-centered {
    min-height: auto;
    padding-top: 24px;
    padding-bottom: 24px;
  }
  .center-card {
    max-width: 92%;
  }
  input[type="text"],
  input[type="email"],
  input[type="password"],
  select {
    padding: 12px 14px;
  }
  .actions .btn-save {
    width: 100%;
    display: block;
    text-align: center;
  }
}

/* Ícones opcionais (caso queira incluir depois) */
.big-action svg {
  width: 20px;
  height: 20px;
  stroke-width: 2.2;
}
</style>
