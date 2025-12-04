<template>
  <div class="agente-ia">
    <main class="agente-ia__content">
      <section
        ref="chatContainer"
        class="agente-ia__chat"
        :class="{ 'agente-ia__chat--has-messages': messages.length > 0 }"
      >
        <ul v-if="messages.length" class="chat-history">
          <li
            v-for="(message, index) in messages"
            :key="index"
            :class="['chat-message', message.role]"
          >
            <span class="chat-message__role">
              {{ message.role === "user" ? "Você" : "Agente IA" }}
            </span>
            <p class="chat-message__text"v-html="message.text"></p>
          </li>
        </ul>

        <div v-else class="placeholder">
          <div class="placeholder__icon" aria-hidden="true">
            <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M60 14c14.4 0 25.9 5.6 33.4 16.8 6.4 9.6 7.9 20.7 7.9 26.7 0 19.9-12.6 35.2-32.3 40.4a6 6 0 0 1-4.6 4.1l-8.6 1.4a6 6 0 0 1-6.8-4.9l-.6-3.4a6 6 0 0 0-5.8-5h-.3c-14 0-26.3-10.3-28.8-24.1C11.1 48.4 12.7 31.2 25.2 21 33.2 14.4 44.8 14 60 14Zm-8.7 69.5 2.5 14.7 8.6-1.4-2.5-14.7-8.6 1.4Zm-7.6-7.2A7.7 7.7 0 1 0 36 68.7a7.7 7.7 0 0 0 7.7 7.7Zm22 0a7.7 7.7 0 1 0 0-15.4 7.7 7.7 0 0 0 0 15.4Zm-20-28.7a6.2 6.2 0 1 0-6.2-6.2 6.2 6.2 0 0 0 6.2 6.2Zm20 0a6.2 6.2 0 1 0-6.2-6.2 6.2 6.2 0 0 0 6.2 6.2Z"
                fill="#ccd2dd"
              />
            </svg>
          </div>
          <p class="placeholder__text">
            Faça uma pergunta para o agente de inteligência e receba uma resposta
            personalizada.
          </p>
        </div>
      </section>

      <form class="agente-ia__input" @submit.prevent="handleSend">
        <input
          v-model="currentMessage"
          type="text"
          placeholder="Digite sua mensagem"
          aria-label="Digite sua mensagem para o agente IA"
        />
        <button type="submit" aria-label="Enviar mensagem">
          <mdicon name="send" :size="20" />
        </button>
      </form>
    </main>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";


const currentMessage = ref("");
const messages = ref([]);
const chatContainer = ref(null);

function scrollToBottom() {
  nextTick(() => {
    const el = chatContainer.value;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  });
}

watch(messages, (newVal, oldVal) => {
  scrollToBottom();
});

import  api  from "../services/api.js";
async function handleSend() {
  const text = currentMessage.value.trim();
  currentMessage.value = "";
  if (!text) return;

  // adiciona a mensagem do usuário na conversa
  messages.value.push({ role: "user", text });
  scrollToBottom();

  try {
    // faz a requisição GET enviando o texto do usuário
    const response = await api.get(`/ai/ask?q=${encodeURIComponent(text)}`);

    // pega a resposta amigável do backend
    const resposta = response.data.resposta;

    // adiciona a resposta da IA na conversa
    messages.value.push({
      role: "assistant",
      text: resposta || "Não foi possível gerar uma resposta.",
    });
    scrollToBottom();
  } catch (error) {
    console.error("Erro ao consultar IA:", error);
    messages.value.push({
      role: "assistant",
      text: "Desculpe, ocorreu um erro ao tentar responder sua pergunta.",
    });
    scrollToBottom();
  }
}

</script>

<style scoped>
.agente-ia {
  min-height: 100vh;
  background: linear-gradient(180deg, #f8fbff 0%, #eef2fb 40%, #ffffff 100%);
  padding: 48px 32px 56px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Poppins", sans-serif;
}

.agente-ia__content {
  width: min(960px, 100%);
  height: 82vh;
  background: #ffffff;
  border-radius: 28px;
  box-shadow: 0 24px 48px rgba(17, 45, 105, 0.12);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 48px 58px;
  position: relative;
}

.agente-ia__chat {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  position: relative;
}

.chat-history {
  list-style: none;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.chat-message {
  max-width: 76%;
  padding: 16px 20px;
  border-radius: 18px;
  box-shadow: 0 16px 32px rgba(22, 64, 155, 0.12);
  background: #f5f7ff;
  align-self: flex-start;
}

.chat-message.user {
  background: linear-gradient(135deg, #2a6bff, #1542da);
  color: #ffffff;
  align-self: flex-end;
}

.chat-message__role {
  display: block;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 6px;
  font-weight: 600;
  opacity: 0.68;
}

.chat-message.user .chat-message__role {
  color: rgba(255, 255, 255, 0.7);
}

.chat-message__text {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
}

.placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 24px;
  color: #8d98ad;
  max-width: 380px;
}

.placeholder__icon {
  width: 200px;
  height: 200px;
}

.placeholder__icon svg {
  width: 100%;
  height: 100%;
}

.placeholder__text {
  font-size: 15px;
  line-height: 1.6;
}

.agente-ia__input {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 32px;
  background: #ffffff;
  border-radius: 999px;
  padding: 10px 16px;
  box-shadow: 0 18px 40px rgba(17, 40, 102, 0.18);
  position: sticky;
  bottom: 0;
}

.agente-ia__input input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 15px;
  font-family: inherit;
  color: #1e2f4f;
}

.agente-ia__input input::placeholder {
  color: #a0acc2;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.agente-ia__input input:focus {
  outline: none;
}

.agente-ia__input button {
  border: none;
  background: linear-gradient(135deg, #2a6bff, #1542da);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 12px 24px rgba(26, 84, 221, 0.35);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.agente-ia__input button:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 32px rgba(26, 84, 221, 0.42);
}

@media (max-width: 1024px) {
  .agente-ia {
    padding: 32px 24px 40px;
  }

  .agente-ia__content {
    padding: 40px 32px;
    height: 78vh;
  }
}

@media (max-width: 640px) {
  .agente-ia {
    padding: 24px 16px 32px;
  }

  .agente-ia__content {
    padding: 28px 20px;
    height: 72vh;
  }

  .agente-ia__input {
    padding: 8px 12px;
  }

  .agente-ia__input button {
    width: 38px;
    height: 38px;
  }

  .chat-message {
    max-width: 90%;
  }
}
</style>
