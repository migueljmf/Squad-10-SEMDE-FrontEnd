<template>
  <div class="endereco-form">
    <div class="grid">
      <label class="field">
        <span>CEP</span>
        <input v-model="form.cep" type="text" placeholder="00000-000" />
      </label>
      <label class="field">
        <span>Numero</span>
        <input v-model="form.numero" type="text" placeholder="Numero" />
      </label>
      <label class="field">
        <span>UF</span>
        <input v-model="form.uf" type="text" maxlength="2" placeholder="UF" />
      </label>
    </div>

    <label class="field">
      <span>Logradouro</span>
      <input v-model="form.logradouro" type="text" placeholder="Rua, avenida..." />
    </label>

    <div class="grid">
      <label class="field">
        <span>Bairro</span>
        <input v-model="form.bairro" type="text" placeholder="Bairro" />
      </label>
      <label class="field">
        <span>Cidade</span>
        <input v-model="form.cidade" type="text" placeholder="Cidade" />
      </label>
    </div>

    <label class="field">
      <span>Complemento / Referencia</span>
      <input v-model="form.complemento" type="text" placeholder="Apartamento, ponto de referenca" />
    </label>
  </div>
</template>

<script setup>
import { reactive, watch } from "vue";
import { criarEnderecoVazio } from "../utils/endereco";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => criarEnderecoVazio(),
  },
});

const emit = defineEmits(["update:modelValue"]);

const form = reactive({ ...criarEnderecoVazio(), ...props.modelValue });

watch(
  () => props.modelValue,
  (valor) => {
    if (!valor || typeof valor !== "object") return;
    Object.assign(form, criarEnderecoVazio(), valor);
  }
);

watch(
  form,
  () => {
    emit("update:modelValue", { ...form });
  },
  { deep: true }
);
</script>

<style scoped>
.endereco-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field span {
  font-size: 13px;
  font-weight: 500;
  color: #334155;
}

.field input {
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid rgba(51, 65, 85, 0.2);
  background: #f8fafc;
  font-size: 14px;
  color: #0f172a;
}

.field input:focus {
  border-color: #2563eb;
  outline: none;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.16);
}
</style>
