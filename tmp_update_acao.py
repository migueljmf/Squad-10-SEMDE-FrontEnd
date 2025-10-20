# -*- coding: utf-8 -*-
from pathlib import Path

path = Path(r"src/views/CadastrarAcaoView.vue")
new_content = """<template>
  <div class=\"page cadastro-acoes\">
    <section class=\"hero\">
      <h1>Nova ação</h1>
      <p>Cadastre a iniciativa com informações completas para que a equipe acompanhe etapas, responsáveis e localização.</p>
    </section>

    <form class=\"form-shell\" @submit.prevent=\"salvarAcao\">
      <div class=\"form-layout\">
        <section class=\"panel\">
          <header class=\"panel__header\">
            <h2>Visão geral</h2>
            <p>Defina título, categoria e prioridades.</p>
          </header>

          <div class=\"panel__grid\">
            <div class=\"field col-8\">
              <label for=\"acao-titulo\">Título *</label>
              <input
                id=\"acao-titulo\"
                v-model=\"titulo\"
                type=\"text\"
                placeholder=\"Nome da ação\"
                required
              />
            </div>

            <div class=\"field col-4\">
              <label for=\"acao-categoria\">Categoria</label>
              <input
                id=\"acao-categoria\"
                v-model=\"categoria\"
                type=\"text\"
                placeholder=\"Ex: Infraestrutura\"
              />
            </div>

            <div class=\"field col-8\">
              <label for=\"acao-descricao\">Descrição *</label>
              <textarea
                id=\"acao-descricao\"
                v-model=\"descricao\"
                placeholder=\"Explique objetivo, entregas e contexto\"
                required
              ></textarea>
            </div>

            <div class=\"field col-4\">
              <label for=\"acao-prioridade\">Prioridade</label>
              <select id=\"acao-prioridade\" v-model=\"prioridade\">
                <option value=\"Alta\">Alta</option>
                <option value=\"Média\">Média</option>
                <option value=\"Baixa\">Baixa</option>
              </select>
            </div>
          </div>
        </section>

        <section class=\"panel\">
          <header class=\"panel__header\">
            <h2>Responsáveis</h2>
            <p>Quem lidera e quem apoia no contato direto.</p>
          </header>

          <div class=\"panel__grid\">
            <div class=\"field col-6\">
              <label for=\"acao-responsavel\">Responsável principal</label>
              <input
                id=\"acao-responsavel\"
                v-model=\"solicitante\"
                type=\"text\"
                placeholder=\"Nome completo"
              />
            </div>

            <div class=\"field col-6\">
              <label for=\"acao-contato\">Canal de contato</label>
              <input
                id=\"acao-contato\"
                v-model=\"contato\"
                type=\"text\"
                placeholder=\"Email ou telefone\"
              />
            </div>

            <div class=\"field col-6\">
              <label for=\"acao-equipe\">Equipe de apoio</label>
              <input
                id=\"acao-equipe\"
                v-model=\"equipe\"
                type=\"text\"
                placeholder=\"Departamentos, parceiros, etc.\"
              />
            </div>

            <div class=\"field col-3\">
              <label for=\"acao-status\">Status</label>
              <select id=\"acao-status\" v-model=\"status\">
                <option value=\"Pendente\">Pendente</option>
                <option value=\"Em andamento\">Em andamento</option>
                <option value=\"Concluída\">Concluída</option>
              </select>
            </div>

            <div class=\"field col-3\">
              <label for=\"acao-inicio\">Início</label>
              <input id=\"acao-inicio\" v-model=\"inicioPrevisto\" type=\"date\" />
            </div>

            <div class=\"field col-3\">
              <label for=\"acao-fim\">Conclusão</label>
              <input id=\"acao-fim\" v-model=\"data\" type=\"date\" />
            </div>

            <div class=\"field col-3\">
              <label for=\"acao-orcamento\">Orçamento (R$)</label>
              <input id=\"acao-orcamento\" v-model=\"orcamento\" type=\"number\" min=\"0\" step=\"0.01\" placeholder=\"Opcional\" />
            </div>
          </div>
        </section>

        <section class=\"panel\">
          <header class=\"panel__header\">
            <h2>Endereço da ação</h2>
            <p>Ponto de execução ou referência para equipes.</p>
          </header>

          <div class=\"panel__grid\">
            <div class=\"field col-3\">
              <label for=\"end-cep\">CEP</label>
              <input id=\"end-cep\" v-model=\"endereco.cep\" type=\"text\" placeholder=\"00000-000\" />
            </div>

            <div class=\"field col-5\">
              <label for=\"end-logradouro\">Logradouro</label>
              <input id=\"end-logradouro\" v-model=\"endereco.logradouro\" type=\"text\" placeholder=\"Rua, avenida...\" />
            </div>

            <div class=\"field col-2\">
              <label for=\"end-numero\">Número</label>
              <input id=\"end-numero\" v-model=\"endereco.numero\" type=\"text\" placeholder=\"S/N\" />
            </div>

            <div class=\"field col-2\">
              <label for=\"end-uf\">UF</label>
              <input id=\"end-uf\" v-model=\"endereco.uf\" maxlength=\"2\" type=\"text\" placeholder=\"UF\" />
            </div>

            <div class=\"field col-4\">
              <label for=\"end-bairro\">Bairro</label>
              <input id=\"end-bairro\" v-model=\"endereco.bairro\" type=\"text\" placeholder=\"Bairro\" />
            </div>

            <div class=\"field col-4\">
              <label for=\"end-cidade\">Cidade</label>
              <input id=\"end-cidade\" v-model=\"endereco.cidade\" type=\"text\" placeholder=\"Cidade\" />
            </div>

            <div class=\"field col-4\">
              <label for=\"end-complemento\">Complemento</label>
              <input
                id=\"end-complemento\"
                v-model=\"endereco.complemento\"
                type=\"text\"
                placeholder=\"Apartamento, bloco, ponto de referência\"
              />
            </div>

            <div class=\"field col-12\">
              <label for=\"acao-local\">Referência / localidade</label>
              <input
                id=\"acao-local\"
                v-model=\"local\"
                type=\"text\"
                placeholder=\"Nome do espaço, equipamento público, etc.\"
              />
            </div>
          </div>
        </section>
      </div>

      <footer class=\"form-actions\">
        <button type=\"button\" class=\"btn ghost\" @click=\"voltar\">Cancelar</button>
        <button type=\"submit\" class=\"btn primary\">Salvar ação</button>
      </footer>
    </form>
  </div>
</template>

<script setup>
import { computed, ref } from \"vue\";
import { useRouter } from \"vue-router\";
import { useDemandasStore } from \"../stores/useDemandasStore\";
import { criarEnderecoVazio, formatarEnderecoCurto } from \"../utils/endereco\";

const router = useRouter();
const store = useDemandasStore();

const titulo = ref(\"\");
const categoria = ref(\"\");
const descricao = ref(\"\");
const prioridade = ref(\"Média\");
const solicitante = ref(\"\");
const contato = ref(\"\");
const equipe = ref(\"\");
const status = ref(\"Pendente\");
const inicioPrevisto = ref(\"\");
const data = ref(\"\");
const orcamento = ref(\"");
const local = ref(\"\");
const endereco = ref(criarEnderecoVazio());

const resumoEndereco = computed(() => {
  const partes = [formatarEnderecoCurto(endereco.value), endereco.value.complemento, local.value]
    .map((parte) => (parte || \"\").trim())
    .filter(Boolean);
  return partes.join(\" - \");
});

function salvarAcao() {
  store.addAcao({
    titulo: titulo.value,
    categoria: categoria.value,
    descricao: descricao.value,
    prioridade: prioridade.value,
    solicitante: solicitante.value,
    contato: contato.value,
    equipe: equipe.value,
    status: status.value,
    inicioPrevisto: inicioPrevisto.value,
    data: data.value,
    orcamento: orcamento.value,
    local: local.value,
    enderecoDetalhado: { ...endereco.value },
    enderecoResumo: resumoEndereco.value,
  });

  limparFormulario();
  router.push(\"/gestao-demandas\");
}

function limparFormulario() {
  titulo.value = \"\";
  categoria.value = \"\";
  descricao.value = \"\";
  prioridade.value = \"Média\";
  solicitante.value = \"\";
  contato.value = \"\";
  equipe.value = \"\";
  status.value = \"Pendente\";
  inicioPrevisto.value = \"\";
  data.value = \"\";
  orcamento.value = \"\";
  local.value = \"\";
  endereco.value = criarEnderecoVazio();
}

function voltar() {
  router.push(\"/gestao-demandas\");
}
</script>

<style scoped>
:root {
  --surface: #ffffff;
  --border: rgba(148, 163, 184, 0.18);
  --text-base: #0f172a;
  --text-muted: #475569;
  --gap: 28px;
  --gap-panel: 24px;
  --gap-field: 8px;
  --radius: 24px;
}

.page {
  min-height: calc(100vh - 96px);
  padding: 72px clamp(16px, 5vw, 72px) 96px;
  background: linear-gradient(180deg, #eef4ff 0%, #ffffff 70%);
  display: flex;
  flex-direction: column;
  gap: 32px;
  box-sizing: border-box;
}

.hero {
  max-width: 960px;
  margin: 0 auto;
  text-align: left;
}

.hero h1 {
  margin: 0;
  font-size: clamp(32px, 5vw, 44px);
  font-weight: 700;
  color: var(--text-base);
}

.hero p {
  margin: 12px 0 0;
  font-size: 16px;
  color: #4c566a;
  max-width: 720px;
}

.form-shell {
  background: var(--surface);
  border-radius: var(--radius);
  border: 1px solid var(--border);
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.12);
  padding: clamp(28px, 4vw, 48px);
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: clamp(32px, 5vw, 48px);
}

.form-layout {
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}

.panel {
  display: flex;
  flex-direction: column;
  gap: var(--gap-panel);
}

.panel__header h2 {
  margin: 0;
  font-size: 22px;
  color: var(--text-base);
  font-weight: 600;
}

.panel__header p {
  margin: 4px 0 0;
  color: var(--text-muted);
  font-size: 14px;
}

.panel__grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 20px 24px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: var(--gap-field);
  color: var(--text-muted);
  font-size: 13px;
}

.field label,
.field > label {
  font-weight: 600;
  color: #1f2a44;
}

.field input,
.field select,
.field textarea {
  width: 100%;
  padding: 12px 16px;
  border-radius: 14px;
  border: 1px solid rgba(148, 163, 184, 0.35);
  background: #f8fafc;
  font-size: 14px;
  color: #0f172a;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.field textarea {
  min-height: 160px;
  resize: vertical;
}

.field input:focus,
.field textarea:focus,
.field select:focus {
  border-color: #2563eb;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.18);
  outline: none;
}

.col-12 { grid-column: span 12; }
.col-8 { grid-column: span 8; }
.col-6 { grid-column: span 6; }
.col-5 { grid-column: span 5; }
.col-4 { grid-column: span 4; }
.col-3 { grid-column: span 3; }
.col-2 { grid-column: span 2; }

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  flex-wrap: wrap;
}

.btn {
  border: none;
  border-radius: 14px;
  padding: 14px 28px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
}

.btn.primary {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: #fff;
  box-shadow: 0 15px 30px rgba(37, 99, 235, 0.28);
}

.btn.primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 20px 36px rgba(37, 99, 235, 0.32);
}

.btn.ghost {
  background: transparent;
  color: #2563eb;
}

.btn.ghost:hover {
  color: #1d4ed8;
}

@media (max-width: 960px) {
  .panel__grid {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }

  .col-12 { grid-column: span 6; }
  .col-8 { grid-column: span 6; }
  .col-6 { grid-column: span 6; }
  .col-5 { grid-column: span 6; }
  .col-4 { grid-column: span 6; }
  .col-3 { grid-column: span 3; }
  .col-2 { grid-column: span 3; }
}

@media (max-width: 640px) {
  .panel__grid {
    grid-template-columns: 1fr;
  }

  .col-12,
  .col-8,
  .col-6,
  .col-5,
  .col-4,
  .col-3,
  .col-2 {
    grid-column: 1 / -1;
  }

  .form-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style>
"""

path.write_text(new_content, encoding="utf-8")
