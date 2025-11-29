<template>
    <article class="demanda-card" :draggable="true" role="button" tabindex="0" @dragstart="onDragStart($event, demanda)"
        @dragend="onDragEnd" @click="abrir(demanda.id)" @keyup.enter="abrir(demanda.id)">
        <div class="badges-container">
            <span class="badge badge-type" :class="['type-' + demanda.tipoClass]">{{ demanda.tipo === "Acao" ? "Ação" : demanda.tipo }}</span>
            <div class="badge-status-wrapper" @click.stop>
                <select :id="'status-' + demanda.id" :value="demanda.statusClass" class="badge badge-status-select"
                    :class="['status-' + demanda.statusClass]" @change="atualizar(demanda.id, $event.target.value, demanda.tipo)">
                    <option value="pendente">Pendente</option>
                    <option value="em-andamento">Em andamento</option>
                    <option value="concluido">Concluída</option>
                    <option value="cancelado">Cancelada</option>
                </select>
            </div>
        </div>

        <h3 class="demanda-title">{{ demanda.titulo }}</h3>
        <p class="demanda-description">{{ demanda.descricaoResumo }}</p>

        <div class="demanda-meta">
            <img :src="iconMarker" alt="Local" class="meta-icon" />
            <span>{{ demanda.categoria }}</span>
            <span class="meta-separator">|</span>
            <span>{{ demanda.dataFormatada }}</span>
        </div>

        <div class="card-actions">
            <button type="button" class="action-button" aria-label="Editar" @click.stop="editar(demanda.id)">
                <img :src="iconPencil" alt="Editar" class="action-icon" />
            </button>
            <button type="button" class="action-button" aria-label="Excluir" @click.stop="remover(demanda.id)">
                <img :src="iconTrash" alt="Excluir" class="action-icon" />
            </button>
        </div>
    </article>
</template>

<script setup>
const props = defineProps({
    demanda: { type: Object, required: true },
    iconPencil: { type: String, default: '' },
    iconTrash: { type: String, default: '' },
    iconMarker: { type: String, default: '' }
});
const emit = defineEmits(['dragstart', 'dragend', 'abrir', 'editar', 'remover', 'atualizar']);

function onDragStart(e, demanda) { emit('dragstart', e, demanda); e.dataTransfer.effectAllowed = 'move'; e.target.style.opacity = '0.5'; }
function onDragEnd(e) { emit('dragend', e); e.target.style.opacity = '1'; }
function abrir(id) { emit('abrir', id); }
function editar(id) { emit('editar', id); }
function remover(id) { emit('remover', id); }
function atualizar(id, novo, tipo) { emit('atualizar', id, novo, tipo); }
</script>

<style scoped>
.demanda-card {
    position: relative;
    width: 100%;
    min-height: 191px;
    border-radius: 20px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    padding:24px 0px 24px 0px;
    overflow: visible;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.demanda-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(21, 101, 192, 0.16);
}

.badges-container {
    position: absolute;
    top: 22px;
    right: 24px;
    display: flex;
    gap: 12px;
    align-items: center;
    z-index: 10;
}

.badge {
    min-width: 135px;
    height: 37px;
    padding: 0 16px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    font-size: 18px;
    line-height: 24px;
    font-weight: 500;
}

.badge-type {
    background-color: #a8ffb8;
    color: #000;
}

.badge-type.type-acao {
    background: #ce93d8;
}

.badge-status-select {
    min-width: 135px;
    height: 37px;
    padding: 0 32px 0 16px;
    border: none;
    border-radius: 50px;
    font-family: "Poppins", sans-serif;
    font-size: 18px;
    line-height: 24px;
    font-weight: 500;
    cursor: pointer;
    appearance: none;
}

.badge-status-select:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.badge-status-select:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
}

/* status-specific colors (restored) */
.badge-status-select.status-pendente {
    background-color: #fddc9c;
    color: #fba441;
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='currentColor' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    transition: all 0.2s ease;
}

.badge-status-select.status-em-andamento,
.badge-status-select.status-andamento {
    background: #90caf9;
    color: #1565c0;
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='currentColor' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    transition: all 0.2s ease;
}

.badge-status-select.status-concluida,
.badge-status-select.status-concluido {
    background: #c8e6c9;
    color: #2e7d32;
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='currentColor' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    transition: all 0.2s ease;
}

.badge-status-select.status-cancelado {
    background: #ffcdd2;
    color: #c62828;
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='currentColor' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    transition: all 0.2s ease;
}

.demanda-title {
    position: absolute;
    top: 80px;
    left: 40px;
    font-size: 24px;
    font-weight: 600;
    color: #000;
    margin: 0;
    max-width: calc(100% - 80px);
}

.demanda-description {
    position: absolute;
    top: 115px;
    left: 40px;
    font-size: 16px;
    color: #555;
    margin: 0;
    max-width: calc(100% - 80px);
    max-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.demanda-meta {
    position: absolute;
    bottom: 24px;
    left: 40px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: #666;
}

.meta-icon {
    width: 16px;
    height: 16px;
}

.card-actions {
    position: absolute;
    bottom: 24px;
    right: 24px;
    display: flex;
    gap: 12px;
    align-items: center;
}

.action-button {
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    background: #fff;
    display: grid;
    place-items: center;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.action-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.action-button.favorito.ativo {
    background: #ffe0e0;
}

.action-icon {
    width: 20px;
    height: 20px;
}

.demanda-card[draggable="true"] {
    cursor: move;
}

.demanda-card[draggable="true"]:active {
    cursor: grabbing;
}
</style>
