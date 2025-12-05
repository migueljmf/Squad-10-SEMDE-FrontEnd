# 🧩 Mandatuum – Guia Completo para Rodar o Projeto (Frontend + Backend)

Este documento explica passo a passo como preparar, instalar, configurar e executar todo o ecossistema do Mandatuum localmente:  
➡️ **Frontend (Vue 3 + Vite)**  
➡️ **Backend (NestJS + Prisma + PostgreSQL)**  

O objetivo é que qualquer pessoa consiga iniciar o ambiente do zero.

---

# 🔧 1. Pré-requisitos Globais

Antes de iniciar qualquer parte do projeto, instale os seguintes itens na sua máquina:

✔ **Node.js 18+**  
https://nodejs.org

✔ **NPM (vem no Node) ou Yarn**

✔ **Docker + Docker Compose** (opcional, recomendado para subir o banco)  
https://www.docker.com/

✔ **PostgreSQL 17+** (se não for usar Docker)

---

# 🗄️ 2. Preparando o Backend (API – NestJS)

O backend do Mandatuum é responsável por toda a lógica de negócios, autenticação, buscas, finanças, demandas e integrações.

---

## 📌 Passo 1 — Clonar o repositório
```bash
git clone https://github.com/Gustavo-Jaccoud/Squad-10-SEMDE-Backend.git
cd Squad-10-SEMDE-Backend
```
## 📌 Passo 2 — Configurar variáveis de ambiente

Copie o arquivo de exemplo:
```bash
cp .env.example .env
```
Abra o .env e ajuste:

`DATABASE_URL`

`JWT_SECRET`

`GOOGLE_API_KEY`

📌 Passo 3 — (Opcional, recomendado) Subir o banco com Docker

Se preferir não instalar PostgreSQL localmente:

```bash
docker compose up -d
```

Isso criará um banco PostgreSQL pronto para uso.

📌 Passo 4 — Instalar dependências

Usando Yarn:

```bash
yarn
```

Ou usando NPM:

```bash
npm install
```

📌 Passo 5 — Executar as migrations e gerar o Prisma Client

### Aplicar migrations

```bash
yarn prisma migrate dev
# ou
npx prisma migrate dev
```

### Gerar o Prisma Client

```bash
yarn prisma generate
# ou
npx prisma generate
```

📌 Passo 6 — Popular o banco com seeds (opcional)

```bash
yarn prisma db seed
# ou
npx prisma db seed
```

Isso cria dados iniciais essenciais para navegar melhor no sistema.

📌 Passo 7 — Rodar o backend em modo desenvolvimento

```bash
yarn start:dev
# ou
npx nest start --watch
```

✔ Backend rodando!  
Acesse:  
👉 http://localhost:3000

---

# 🖥️ 3. Preparando o Frontend (Vue 3 + Vite)

O frontend é o painel visual, onde acontecem login, demandas, tarefas, mapas, dashboard, financeiro e IA.

📌 Passo 1 — Clonar o repositório

```bash
git clone https://github.com/migueljmf/Squad-10-SEMDE-FrontEnd.git
cd Squad-10-SEMDE-Frontend
```

(Use a URL real do repositório caso seja diferente.)

📌 Passo 2 — Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz:

```
VITE_API_URL=http://localhost:3000/api
```

Se estiver usando outra porta no backend, ajuste aqui.

📌 Passo 3 — Instalar as dependências

```bash
npm install
```

📌 Passo 4 — Rodar o servidor de desenvolvimento

```bash
npm run dev
```

O projeto abrirá em:  
👉 http://localhost:5173

(a porta pode variar)

📌 Passo 5 — Build para produção (opcional)

```bash
npm run build
npm run preview
```

---

# 🌐 4. Fluxo completo para rodar o projeto

A sequência recomendada é:

✔ 1. Subir o Backend

- Configurar `.env`  
- Docker (opcional)  
- Migrations + Seeds  
- `start:dev`

✔ 2. Subir o Frontend

- Configurar `.env` apontando para o backend
```bash 
npm run dev
```

✔ 3. Acessar o painel

👉 http://localhost:5173

Autentique-se com algum usuário gerado pelo seed ou crie um novo via API.

---

# 🗂️ 5. Estrutura resumida dos diretórios

**Backend (NestJS)**  
```
prisma/
src/
  action/
  address/
  advisor/
  ai/
  auth/
  category/
  city/
  common/
  contact/
  demands/
  financial/
  financial-category/
  parliamentary/
  prisma/
  state/
  task/
  user/
```

**Frontend (Vue 3)**  
```
src/
  assets/
  auth/
  components/
  lib/
  router/
  services/
  stores/
  types/
  utils/
  views/
```

---

# 🚀 6. Dicas importantes

🔸 Sempre verifique se o backend está rodando antes do frontend.  
Sem isso, o front exibirá erros ou ficará travado em "carregando".

🔸 Em ambientes reais (deploy), configure corretamente:

- `VITE_API_URL` no servidor 
- Variáveis do NestJS no servidor

🔸 Docker é a forma mais simples de ter o banco pronto em ambiente de teste, se não quiser instalar PostgreSQL localmente.
