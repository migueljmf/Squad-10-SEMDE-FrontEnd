# Gestor de Demandas - Squad 10 (SEMDE) 🚀

Aplicação front-end em Vue 3 para concentrar a gestão de demandas, ações, tarefas e informações financeiras/eleitorais do mandato. Inclui painéis, mapas, automação de status e um agente IA para apoio no atendimento.

## 🌐 Deploy
- Produção: https://mandattum.vercel.app/
- Plataforma: Vercel (build com `npm run build` + Vite).
- Fluxo: cada push na branch principal gera um novo deploy automático; para publicar manualmente, use o painel da Vercel ou `vercel --prod` (com o projeto já linkado).
- Variáveis na Vercel: defina `VITE_API_URL` (ex.: `https://semde.vercel.app/api`) em Project Settings → Environment Variables e redeploy para aplicar.

## ✨ Funcionalidades principais
- 🔐 Autenticação via JWT, guarda de rotas e controle de acesso por papel (ADMIN, PARLIAMENTARY, ADVISOR).
- 📊 Dashboard com métricas de demandas, evolução mensal, distribuição por status e categorias.
- ✅ Gestão de tarefas/ações: criar, editar, mudar status, consultar detalhes e acompanhar prazos.
- 🗺️ Visualização geográfica das tarefas com Leaflet (mapa/heatmap) e dados de endereço.
- 🤖 Agente IA para perguntas rápidas, integrando com o endpoint `/ai/ask`.
- 💰 Financeiro, eleições e cadastros auxiliares (contatos, categorias, usuários, senha e perfil).
- 🔔 Toasts globais e feedback automático a partir das respostas da API.

## 🛠 Tecnologias utilizadas
- Vue 3 + Vite (`script setup`).
- Vue Router para navegação protegida.
- Axios com interceptors (headers de autenticação e tratamento de erros).
- Chart.js + vue-chartjs para gráficos do dashboard.
- Leaflet (incluindo heatmap) para mapas.
- Icons com mdi-vue / @mdi/js e svg loader.

## 📦 Pré-requisitos
- Node.js 18+ e npm.
- Backend acessível em `VITE_API_URL` (padrão: `https://semde.vercel.app/api`).
- Navegador moderno (Chrome, Edge, Firefox, etc.).

## ⚙️ Instalação e execução
```bash
npm install
npm run dev   # inicia em modo desenvolvimento (Vite)

# produção
npm run build
npm run preview
```

### Variáveis de ambiente
Crie um arquivo `.env` na raiz (se ainda não existir):
```env
VITE_API_URL=https://semde.vercel.app/api
```

## 🧭 Estrutura de pastas (resumo)
```
src/
  assets/          # imagens, ícones e SVGs
  auth/            # helpers de autenticação (JWT, roles, logout)
  components/      # componentes reutilizáveis (sidebar, toasts, mapas, gráficos)
  lib/             # libs auxiliares (ex.: leaflet-heat)
  router/          # rotas protegidas e guards
  services/        # chamadas HTTP (demandas, ações, contatos, finanças, IA)
  stores/          # estado reativo das demandas e notificações
  utils/           # utilitários de endereço e formatação
  views/           # páginas: login, dashboard, demandas, tarefas, IA, financeiro...
```

## ▶️ Exemplos de uso
Carregar e criar demandas via store:
```js
import { useDemandasStore } from '@/stores/useDemandasStore'

const store = useDemandasStore()
await store.fetchDemandas()

await store.addTarefa({
  titulo: 'Reunião comunitária',
  descricao: 'Visita ao bairro para ouvir lideranças',
  data: '2025-01-20',
  status: 'Pendente'
})
```

Chamada direta à API com token (Axios + interceptor):
```js
import api from '@/services/api'

// token é adicionado automaticamente se estiver em localStorage
const { data } = await api.get('/demands')
console.log(data)
```

## 🤝 Como contribuir
1. Faça um fork ou crie uma branch a partir de `main`.
2. Crie uma nova branch para sua feature/fix (`feature/nome` ou `fix/issue-123`).
3. Instale dependências e rode `npm run dev` para validar localmente.
4. Adicione testes ou validações que façam sentido para sua alteração.
5. Abra um Pull Request descrevendo o que mudou e como testar.

## 👥 Autor(es)
- Gustavo 
- João MIguel
- Sergio
- Emanoel 
- Yuri
- Julia 
- Bianca
- Mariana 

## 📝 Licença
Ainda não há licença pública definida. Adicione aqui a licença escolhida (ex.: MIT) antes de distribuir o código.
